/** Harmonized with CMS + mobile — M-Pesa Express STK client constants. */

export const MPESA_POLL_INTERVAL_MS = 3000;
export const MPESA_POLL_TIMEOUT_MS = 120_000;

export type PaymentMode = "demo" | "live-sandbox" | "live-production" | "misconfigured";

export type StkPaymentResult = {
  status: "success" | "pending" | "failed";
  bookingId?: string;
  reference: string;
  mpesaReceipt?: string;
  paidAt?: string;
  demo?: boolean;
  message?: string;
  checkoutRequestId?: string;
};

export type CmsHealth = {
  ok: boolean;
  paymentMode: PaymentMode;
  mpesaEnvironment?: string;
  callbackHost?: string | null;
};

export function paymentModeLabel(mode: PaymentMode): string {
  switch (mode) {
    case "demo":
      return "Demo M-Pesa (no charge)";
    case "live-sandbox":
      return "M-Pesa Express · sandbox";
    case "live-production":
      return "M-Pesa Express · enter PIN on your phone";
    case "misconfigured":
      return "M-Pesa not configured on booking server";
    default:
      return "M-Pesa Express";
  }
}

export function mpesaTrustCopy(mode: PaymentMode | null): string {
  if (mode === "demo") {
    return "Demo mode — payment completes instantly with no M-Pesa charge.";
  }
  if (mode === "live-production" || mode === "live-sandbox") {
    return `${paymentModeLabel(mode)} An STK push will be sent to your phone — enter your PIN to pay.`;
  }
  return "M-Pesa Express STK will be sent when the booking server is ready.";
}
