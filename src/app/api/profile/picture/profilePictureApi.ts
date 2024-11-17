export async function deleteProfilePicture(): Promise<void> {
  const endpoint = `/api/profile/picture`;

  await fetch(endpoint, {
    method: "DELETE",
  });
}
