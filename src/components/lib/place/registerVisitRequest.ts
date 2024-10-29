import { RegisterVisitPayload } from "@/app/api/visit/register/route";

export async function requestRegisterVisit(
  payload: RegisterVisitPayload,
): Promise<void> {
  await fetch("/api/visit/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
