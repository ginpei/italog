import { sql } from "@vercel/postgres";
import { VisitPlace } from "./VisitPlace";

export async function getUserVisitPlace(
  userId: string,
  options: { limit?: number; offset?: number } = {},
): Promise<VisitPlace[]> {
  const result = await sql`
      SELECT visit.*, place.display_name as place_name
      FROM visit
      JOIN place ON visit.place_id = place.id
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${options.limit || 10} OFFSET ${options.offset || 0}
    `;

  const visits = result.rows.map(
    (row): VisitPlace => ({
      comment: row.comment,
      createdAt: Number(row.created_at),
      date: row.date,
      id: row.id,
      placeId: row.place_id,
      placeName: row.place_name,
      starred: row.starred,
      userId: row.user_id,
    }),
  );
  return visits;
}
