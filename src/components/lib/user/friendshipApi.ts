import {
  DeleteFriendshipPayload,
  PostFriendshipPayload,
} from "@/app/api/friendship/route";

export function createFriendship(targetUserId: string): Promise<Response> {
  const endpoint = "/api/friendship";
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetUserId,
    } satisfies PostFriendshipPayload),
  });
}

export function deleteFriendship(targetUserId: string): Promise<Response> {
  const endpoint = "/api/friendship";
  return fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetUserId,
    } satisfies DeleteFriendshipPayload),
  });
}
