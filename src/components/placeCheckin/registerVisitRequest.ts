import { RegisterCheckinPayload } from "@/app/api/checkin/place/route";

export async function requestRegisterVisit(
  payload: RegisterCheckinPayload,
): Promise<void> {
  await fetch("/api/checkin/place", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
