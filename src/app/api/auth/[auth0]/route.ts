// app/api/auth/[auth0]/route.js
import {
  AfterCallbackAppRoute,
  AppRouteHandlerFnContext,
  handleAuth,
  handleCallback,
} from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";
import {
  getAuthProfileRecord,
  updateAuthProfileRecord,
} from "@/components/auth/authProfileDb";
import { createProfileRecordSet } from "@/components/user/profileDb";

const afterCallback: AfterCallbackAppRoute = async (req, session) => {
  const userId = session.user.sub;

  const authProfile = await getAuthProfileRecord(userId);
  if (!authProfile) {
    await createProfileRecordSet("auth0", userId, {
      displayName: session.user.nickname,
    });

    // TODO
    // redirect("/tos");
  }

  await updateAuthProfileRecord(userId, session.user);

  return session;
};

export const GET = handleAuth({
  callback: async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
    const callback = await handleCallback(req, ctx, { afterCallback });
    return callback;
  },
});
