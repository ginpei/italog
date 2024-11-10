import { RegisterCheckinPayload } from "@/app/api/place/[placeId]/checkIn/route";

export async function requestRegisterVisit(
  payload: RegisterCheckinPayload,
): Promise<void> {
  await fetch("/api/place/checkIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
