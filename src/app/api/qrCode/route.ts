import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export interface GetQrCodeResult {
  qrCode: string;
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = await getSession();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const text = getValidTargetUrl(url);
  if (!text) {
    return new Response("Invalid request", { status: 400 });
  }

  const qrCode = await generateQrCode(text);
  return NextResponse.json({ qrCode } satisfies GetQrCodeResult);
}

function getValidTargetUrl(reqUrl: URL) {
  // return only if the URL is the same host

  const target = reqUrl.searchParams.get("url");
  if (!target) {
    return null;
  }

  const targetUrl = new URL(target);
  if (reqUrl.host !== targetUrl.host) {
    return null;
  }

  return target;
}

function generateQrCode(url: string) {
  return new Promise<string>((resolve, reject) => {
    QRCode.toDataURL(url, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
}
