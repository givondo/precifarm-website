import { NextResponse } from "next/server";
import { isDemoPayment } from "@/lib/booking";
import { cmsStkPayment, CmsError, isCmsEnabled } from "@/lib/cms";
import { getBooking, updateBooking } from "@/lib/booking-store";
import { processMpesaPayment } from "@/lib/mpesa";

type PaymentRequest = {
  bookingId: string;
};

export async function POST(request: Request) {
  let body: PaymentRequest;

  try {
    body = (await request.json()) as PaymentRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.bookingId) {
    return NextResponse.json({ error: "Booking ID is required." }, { status: 400 });
  }

  if (isCmsEnabled()) {
    try {
      const data = await cmsStkPayment(body.bookingId);
      if (data.status === "pending") {
        return NextResponse.json({
          status: "pending",
          bookingId: body.bookingId,
          reference: data.reference ?? "",
          demo: false,
          message: data.message ?? "STK push sent. Enter your M-Pesa PIN on your phone.",
          checkoutRequestId: data.checkoutRequestId,
        });
      }
      if (data.status !== "success") {
        return NextResponse.json(
          { error: data.message ?? "Payment could not be started." },
          { status: 402 }
        );
      }
      return NextResponse.json({
        status: "success",
        bookingId: body.bookingId,
        reference: data.reference ?? "",
        mpesaReceipt: data.mpesaReceipt,
        paidAt: data.paidAt,
        demo: data.demo ?? false,
        message: data.message,
      });
    } catch (err) {
      const message = err instanceof CmsError ? err.message : "Payment failed.";
      const status = err instanceof CmsError ? err.status : 502;
      return NextResponse.json({ error: message }, { status });
    }
  }

  const booking = getBooking(body.bookingId);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  if (booking.status === "paid") {
    return NextResponse.json({
      status: "success",
      reference: booking.reference,
      mpesaReceipt: booking.mpesaReceipt,
      paidAt: booking.paidAt,
      demo: isDemoPayment(),
      message: "This booking is already paid.",
    });
  }

  const result = await processMpesaPayment(booking);

  if (result.status === "success") {
    updateBooking(booking.id, {
      status: "paid",
      mpesaReceipt: result.mpesaReceipt,
      paidAt: result.paidAt ?? new Date().toISOString(),
    });
  } else {
    updateBooking(booking.id, { status: "failed" });
  }

  if (result.status === "failed") {
    return NextResponse.json({ error: result.message ?? "Payment failed." }, { status: 402 });
  }

  return NextResponse.json(result);
}
