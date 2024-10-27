import { NextRequest } from "next/server";
import { toError } from "@/components/error/errorUtil";

export async function GET(request: NextRequest) {
  try {
    const reqParams = new URL(request.url).searchParams;
    const location = reqParams.get("location");
    if (!location) {
      return new Response(
        JSON.stringify({ message: "Location is required", ok: false }),
        { status: 400 },
      );
    }

    const data = await query(location);

    return Response.json({ data });
  } catch (errorish) {
    const error = toError(errorish);
    console.error(error);

    return new Response(JSON.stringify({ message: error.message, ok: false }), {
      status: 500,
    });
  }
}

async function query(location: string) {
  const endpoint =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

  const url = new URL(endpoint);
  url.searchParams.set("location", location);

  const res = await fetch(url.toString());
  const data = await res.json();
  if (!res.ok || data.status !== "OK") {
    throw new Error(data.error_message ?? "Unknown error on fetch");
  }

  return data;
}
