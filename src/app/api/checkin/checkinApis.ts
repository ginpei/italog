import { PostCheckinPayload, PostCheckinResult } from "./route";

/**
 * @returns The ID of the created checkin.
 */
export async function requestPostCheckin(
  payload: Omit<PostCheckinPayload, "timezoneOffset">,
): Promise<PostCheckinResult> {
  const endpoint = "/api/checkin";

  const body: PostCheckinPayload = {
    ...payload,
    timezoneOffset: new Date().getTimezoneOffset(),
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result: PostCheckinResult = await res.json();
  if (!result.ok) {
    throw new Error(result.error);
  }

  return result;
}