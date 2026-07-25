import { NextResponse } from "next/server";
import { cmsPaymentStatus, CmsError, isCmsEnabled } from "@/lib/cms";

export async function GET(request: Request) {
  const bookingId = new URL(request.url).searchParams.get("bookingId");
  if (!bookingId) {
    return NextResponse.json({ error: "bookingId is required." }, { status: 400 });
  }

  if (!isCmsEnabled()) {
    return NextResponse.json(
      { error: "Payment status requires CMS_API_URL." },
      { status: 503 }
    );
  }

  try {
    const data = await cmsPaymentStatus(bookingId);
    return NextResponse.json({
      reference: data.reference,
      bookingStatus: data.bookingStatus,
      paymentStatus: data.paymentStatus,
      mpesaReceipt: data.mpesaReceipt,
      paid: data.bookingStatus === "paid",
      failed: data.paymentStatus === "failed",
    });
  } catch (err) {
    const message = err instanceof CmsError ? err.message : "Could not fetch payment status.";
    const status = err instanceof CmsError ? err.status : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
