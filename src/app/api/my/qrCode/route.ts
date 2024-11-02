import { NextResponse } from "next/server";
import QRCode from "qrcode";

export interface GetMyQrCodeContext {
  params: {
    url: string;
  };
}

export interface GetMyQrCodeResult {
  qrCode: string;
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  if (!isValid()) {
    return new Response("Invalid request", { status: 400 });
  }

  const qrCode = await generateQrCode(url.searchParams.get("url")!);
  return NextResponse.json({ qrCode } satisfies GetMyQrCodeResult);
}

function isValid() {
  // TODO check if the request is own user page
  return true;
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
