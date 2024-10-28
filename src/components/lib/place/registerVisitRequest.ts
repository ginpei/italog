import { Visit } from "../visit/Visit";

export async function requestRegisterVisit(visit: Visit): Promise<void> {
  await fetch("/api/visit/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ visit }),
  });
}
