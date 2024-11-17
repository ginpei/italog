import { handleUpload, HandleUploadBody } from "@vercel/blob/client";
import { UnwrapPromise } from "next/dist/lib/coalesced-function";
import { NextResponse } from "next/server";
import { runTransaction } from "@/components/db/transaction";
import { toError } from "@/components/error/errorUtil";
import { getUserIdFromPicturePath } from "@/components/user/Profile";
import { updateProfilePictureRecord } from "@/components/user/profileDb";
import { getSessionProfile } from "@/components/user/profileSession";

// export interface PostProfilePicturePayload {
// }

export type PostProfilePictureResult =
  | UnwrapPromise<ReturnType<typeof handleUpload>>
  | {
      error: string;
      ok: false;
    };

interface TokenPayload {
  pathname: string;
  userId: string;
}

export async function POST(
  req: Request,
): Promise<NextResponse<PostProfilePictureResult>> {
  // https://vercel.com/docs/storage/vercel-blob/client-upload

  try {
    const body: HandleUploadBody = await req.json();

    return runTransaction(async (db) => {
      const jsonResponse = await handleUpload({
        body,
        request: req,
        onBeforeGenerateToken: async (pathname) => {
          const profile = await getSessionProfile();
          if (!profile) {
            throw new Error("No login");
          }

          const userId = getUserIdFromPicturePath(pathname);
          if (userId !== profile?.id) {
            throw new Error("Wrong user");
          }

          return {
            allowedContentTypes: ["image/jpeg", "image/png", "image/gif"],
            addRandomSuffix: false, // TODO remove
            maximumSizeInBytes: 1024 * 1024 * 2, // 2MB
            tokenPayload: JSON.stringify({
              pathname,
              userId,
            } satisfies TokenPayload),
          };
        },
        onUploadCompleted: async ({ blob, tokenPayload }) => {
          const payload: TokenPayload = JSON.parse(tokenPayload!);
          await updateProfilePictureRecord(db, {
            id: payload.userId,
            imageUrl: blob.url,
          });

          // TODO delete old image
        },
      });

      return NextResponse.json(jsonResponse);
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: toError(error).message, ok: false },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    );
  }
}
