import { NextResponse } from "next/server";
import { cmsGetSeats, CmsError, isCmsEnabled } from "@/lib/cms";
import { getBookedSeats } from "@/lib/booking-store";
import { nairobiKisumuRoute } from "@/lib/route";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const routeId = searchParams.get("routeId");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  if (!routeId || !date || !time) {
    return NextResponse.json(
      { error: "routeId, date and time are required." },
      { status: 400 }
    );
  }

  if (routeId !== nairobiKisumuRoute.id) {
    return NextResponse.json({ error: "Route not available." }, { status: 400 });
  }

  if (!nairobiKisumuRoute.departures.includes(time as (typeof nairobiKisumuRoute.departures)[number])) {
    return NextResponse.json({ error: "Invalid departure time." }, { status: 400 });
  }

  if (isCmsEnabled()) {
    try {
      const occupied = await cmsGetSeats(routeId, date, time);
      return NextResponse.json({ occupied });
    } catch (err) {
      const message = err instanceof CmsError ? err.message : "Could not load seat availability.";
      const status = err instanceof CmsError ? err.status : 502;
      return NextResponse.json({ error: message }, { status });
    }
  }

  const occupied = getBookedSeats(routeId, date, time);
  return NextResponse.json({ occupied });
}
