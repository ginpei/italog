// app/api/auth/[auth0]/route.js
import {
  AfterCallbackAppRoute,
  AppRouteHandlerFnContext,
  handleAuth,
  handleCallback,
} from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";
import {
  createProfileRecordSet,
  getProfileRecordByAuth,
} from "@/components/lib/user/profileDb";

const afterCallback: AfterCallbackAppRoute = async (req, session) => {
  const userId = session.user.sub;
  const profile = await getProfileRecordByAuth("auth0", userId);
  if (!profile) {
    await createProfileRecordSet("auth0", userId, {
      displayName: session.user.nickname,
    });
  }

  return session;
};

export const GET = handleAuth({
  callback: async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
    const callback = await handleCallback(req, ctx, { afterCallback });
    return callback;
  },
});
