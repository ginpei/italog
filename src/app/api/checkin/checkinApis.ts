import { PostCheckinPayload, PostCheckinResult } from "./route";
import { EditingCheckinRow } from "@/components/checkin/Checkin";

/**
 * @returns The ID of the created checkin.
 */
export async function requestPostCheckin(
  checkin: EditingCheckinRow,
): Promise<PostCheckinResult> {
  const endpoint = "/api/checkin";

  const imageUrls: PostCheckinPayload["checkin"]["imageUrls"] = []; // TODO

  const body: PostCheckinPayload = {
    checkin: {
      ...checkin,
      imageUrls,
    },
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
