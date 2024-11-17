import { upload } from "@vercel/blob/client";
import { getUserIdFromPicturePath } from "./route";

export async function uploadProfilePicture(
  userId: string,
  file: File,
): Promise<unknown> {
  const endpoint = `/api/profile/picture`;

  const ext = ".jpg";
  const pathname = `user/${userId}/profile${ext}`;
  if (!getUserIdFromPicturePath(pathname)) {
    throw new Error("Invalid pathname");
  }

  const res = await upload(pathname, file, {
    access: "public",
    handleUploadUrl: endpoint,
    onUploadProgress: (progress) => {
      console.log("upload progress", progress);
    },
  });
  return res;
}
