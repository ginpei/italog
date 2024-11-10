import {
  CreateCheckinPayload,
  CreateCheckinResult,
} from "@/app/api/place/[placeId]/checkIn/route";

export async function requestCreatePlaceCheckin(
  boardId: string,
  checkin: Omit<CreateCheckinPayload["checkin"], "userDate">,
): Promise<void> {
  const endpoint = `/api/place/${boardId}/checkIn`;

  const timezoneOffset = new Date().getTimezoneOffset();

  const body: CreateCheckinPayload = {
    checkin: { ...checkin, userDate: new Date().toISOString() }, // TODO remove userDate
    timezoneOffset,
  };

  const res = await fetch(endpoint, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const data: CreateCheckinResult = await res.json();
  if (!data.ok) {
    throw new Error(data.error);
  }
}