import { upload } from "@vercel/blob/client";
import { getUserIdFromPicturePath } from "@/components/user/Profile";

export async function uploadProfilePicture(
  userId: string,
  file: File,
): Promise<unknown> {
  const endpoint = `/api/profile/picture`;

  // TODO extract
  if (file.size > 1024 * 1024 * 2) {
    throw new Error("2MB limit");
  }

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
