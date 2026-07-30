import { redirect } from "next/navigation";

/** Legacy URL — house-based private charging lives at /charging/private-house */
export default function HomeChargingRedirect() {
  redirect("/charging/private-house");
}
