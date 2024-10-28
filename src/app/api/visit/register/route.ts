import { getSession } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { Visit } from "@/components/lib/visit/Visit";
import { createVisitRecord } from "@/components/lib/visit/visitDb";

export interface RegisterVisitPayload {
  visit: Visit;
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const session = await getSession();
    const userId = session?.user.sub;
    if (!userId) {
      // TODO handle
      throw new Error("User not authenticated");
    }

    const body: RegisterVisitPayload = await req.json();
    const visit = body.visit;

    const now = new Date();
    const data: Visit = {
      comment: visit.comment,
      createdAt: now.getTime(),
      date: now.toISOString().slice(0, 10), // TODO consider user timezone
      id: crypto.randomUUID(),
      placeId: visit.placeId,
      starred: visit.starred,
      userId,
    };

    await createVisitRecord(data);

    return Response.json({ ok: true });
  } catch (error) {
    // TODO handle
    console.error(error);
    res.status(500);
    res.json({ error: "Internal server error", ok: false });
  }
}
