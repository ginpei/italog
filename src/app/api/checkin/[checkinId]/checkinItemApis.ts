import {
  UpdateCheckinPayload,
  UpdateCheckinResult,
} from "@/app/api/checkin/[checkinId]/route";
import { CheckinRow, EditingCheckinRow } from "@/components/checkin/Checkin";

export async function requestPatchCheckin(
  boardId: string,
  checkin: EditingCheckinRow,
): Promise<void> {
  const endpoint = `/api/checkin/${boardId}`;

  const imageUrls: CheckinRow["imageUrls"] = []; // TODO

  const body: UpdateCheckinPayload = {
    checkin: {
      ...checkin,
      imageUrls,
    },
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
