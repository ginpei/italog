import { RegisterCheckinPayload } from "@/app/api/visit/register/route";

export async function requestRegisterVisit(
  payload: RegisterCheckinPayload,
): Promise<void> {
  await fetch("/api/visit/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}