import type { Booking, PaymentResult } from "@/lib/booking";
import { isDemoPayment } from "@/lib/booking";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function demoReceipt(): string {
  return `DEMO${Date.now().toString().slice(-8)}`;
}

async function initiateDemoStkPush(booking: Booking): Promise<PaymentResult> {
  await delay(2500);

  const paidAt = new Date().toISOString();
  return {
    status: "success",
    reference: booking.reference,
    mpesaReceipt: demoReceipt(),
    paidAt,
    demo: true,
    message: "Demo payment successful. No M-Pesa charge was made.",
  };
}

async function initiateLiveStkPush(booking: Booking): Promise<PaymentResult> {
  const consumerKey = process.env.MPESA_CONSUMER_KEY!;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
  const passkey = process.env.MPESA_PASSKEY!;
  const shortcode = process.env.MPESA_SHORTCODE!;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;
  const environment = process.env.MPESA_ENVIRONMENT ?? "sandbox";

  if (!callbackUrl) {
    return {
      status: "failed",
      reference: booking.reference,
      message: "M-Pesa callback URL is not configured.",
    };
  }

  const baseUrl =
    environment === "production"
      ? "https://api.safaricom.co.ke"
      : "https://sandbox.safaricom.co.ke";

  const authResponse = await fetch(
    `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")}`,
      },
    }
  );

  if (!authResponse.ok) {
    return {
      status: "failed",
      reference: booking.reference,
      message: "Could not authenticate with M-Pesa.",
    };
  }

  const { access_token: accessToken } = (await authResponse.json()) as {
    access_token?: string;
  };

  if (!accessToken) {
    return {
      status: "failed",
      reference: booking.reference,
      message: "M-Pesa access token missing.",
    };
  }

  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

  const stkResponse = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: booking.total,
      PartyA: booking.phone,
      PartyB: shortcode,
      PhoneNumber: booking.phone,
      CallBackURL: callbackUrl,
      AccountReference: booking.reference,
      TransactionDesc: `Precifarm ${booking.from}-${booking.to}`,
    }),
  });

  const stkData = (await stkResponse.json()) as {
    CheckoutRequestID?: string;
    ResponseDescription?: string;
    errorMessage?: string;
  };

  if (!stkResponse.ok || !stkData.CheckoutRequestID) {
    return {
      status: "failed",
      reference: booking.reference,
      message:
        stkData.errorMessage ||
        stkData.ResponseDescription ||
        "M-Pesa STK push could not be initiated.",
    };
  }

  return {
    status: "success",
    reference: booking.reference,
    message: "STK push sent. Complete payment on your phone.",
    demo: false,
  };
}

export async function processMpesaPayment(booking: Booking): Promise<PaymentResult> {
  if (isDemoPayment()) {
    return initiateDemoStkPush(booking);
  }
  return initiateLiveStkPush(booking);
}
