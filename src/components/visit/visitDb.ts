import { sql } from "@vercel/postgres";
import { Visit } from "./Visit";

export async function createVisitRecord(visit: Visit): Promise<void> {
  await sql`
    INSERT INTO visit (comment, created_at, date, place_id, starred, user_id)
    VALUES (${visit.comment}, ${visit.createdAt}, ${visit.date}, ${visit.placeId}, ${visit.starred}, ${visit.userId})
  `;
}

export async function updateVisitRecord(visit: Visit): Promise<void> {
  await sql`
    UPDATE visit
    SET comment = ${visit.comment},
        starred = ${visit.starred}
    WHERE place_id = ${visit.placeId} AND user_id = ${visit.userId} AND date = ${visit.date}
  `;
}

export async function getUserVisitRecords(
  userId: string,
  placeId: string,
  options: { limit?: number; offset?: number } = {},
): Promise<Visit[]> {
  const result = await sql`
    SELECT * FROM visit
    WHERE user_id = ${userId} AND place_id = ${placeId}
    ORDER BY created_at DESC
    LIMIT ${options.limit || 10} OFFSET ${options.offset || 0}
  `;

  const visits = result.rows.map(
    (row): Visit => ({
      comment: row.comment,
      createdAt: Number(row.created_at),
      date: row.date,
      placeId: row.place_id,
      starred: row.starred,
      userId: row.user_id,
    }),
  );
  return visits;
}
