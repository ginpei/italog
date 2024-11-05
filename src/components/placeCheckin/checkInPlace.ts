import { RegisterCheckinPayload } from "@/app/api/place/checkIn/route";

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
