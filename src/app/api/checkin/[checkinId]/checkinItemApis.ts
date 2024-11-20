import {
  UpdateCheckinPayload,
  UpdateCheckinResult,
} from "@/app/api/checkin/[checkinId]/route";

export async function requestPatchCheckin(
  boardId: string,
  checkin: UpdateCheckinPayload["checkin"],
): Promise<void> {
  const endpoint = `/api/checkin/${boardId}`;

  const body: UpdateCheckinPayload = {
    checkin,
  };

  const res = await fetch(endpoint, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
  });

  const data: UpdateCheckinResult = await res.json();
  if (!data.ok) {
    throw new Error(data.error);
  }
}

export async function requestDeleteCheckin(checkinId: string): Promise<void> {
  const endpoint = `/api/checkin/${checkinId}`;

  const res = await fetch(endpoint, {
    method: "DELETE",
  });

  const data = await res.json();
  if (!data.ok) {
    throw new Error(data.error);
  }
}
