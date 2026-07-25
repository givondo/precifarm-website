import { NextResponse } from "next/server";
import { buildBooking, validateBookingInput, type CreateBookingInput } from "@/lib/booking";
import { cmsCreateBooking, CmsError, isCmsEnabled } from "@/lib/cms";
import { areSeatsAvailable, saveBooking } from "@/lib/booking-store";

export async function POST(request: Request) {
  let body: CreateBookingInput;

  try {
    body = (await request.json()) as CreateBookingInput;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validateBookingInput(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  if (isCmsEnabled()) {
    try {
      const data = await cmsCreateBooking({
        routeId: body.routeId,
        date: body.date,
        time: body.time,
        passengers: body.passengers,
        seats: body.seats,
        name: body.name,
        phone: body.phone,
        idNumber: body.idNumber,
        email: body.email,
        channel: "web",
      });
      return NextResponse.json({
        bookingId: data.bookingId,
        reference: data.reference,
        total: data.total,
        status: data.status,
      });
    } catch (err) {
      const message = err instanceof CmsError ? err.message : "Could not create booking.";
      const status = err instanceof CmsError ? err.status : 502;
      return NextResponse.json({ error: message }, { status });
    }
  }

  if (!areSeatsAvailable(body.routeId, body.date, body.time, body.seats)) {
    return NextResponse.json(
      { error: "One or more selected seats are no longer available. Please choose different seats." },
      { status: 409 }
    );
  }

  const booking = buildBooking(body);
  saveBooking(booking);

  return NextResponse.json({
    bookingId: booking.id,
    reference: booking.reference,
    total: booking.total,
    status: booking.status,
  });
}
