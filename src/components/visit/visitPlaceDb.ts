import { sql } from "@vercel/postgres";
import { VisitPlace } from "./VisitPlace";

export async function getUserVisitPlace(
  userId: string,
  options: { limit?: number; offset?: number } = {},
): Promise<VisitPlace[]> {
  const result = await sql`
      SELECT visit.*, place.display_name as place_name, profile.display_name as user_display_name
      FROM visit
      JOIN place ON visit.place_id = place.id
      JOIN profile ON visit.user_id = profile.id
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${options.limit || 10} OFFSET ${options.offset || 0}
    `;

  const visits = result.rows.map(
    (row): VisitPlace => ({
      comment: row.comment,
      createdAt: Number(row.created_at),
      date: row.date,
      placeId: row.place_id,
      placeName: row.place_name,
      starred: row.starred,
      userId: row.user_id,
      userName: row.user_display_name,
    }),
  );
  return visits;
}

export async function getVisitTimeline(userId: string): Promise<VisitPlace[]> {
  const result = await sql`
      SELECT visit.*, place.display_name as place_name, profile.display_name as user_display_name
      FROM visit
      JOIN place ON visit.place_id = place.id
      JOIN profile ON visit.user_id = profile.id
      LEFT JOIN user_user ON visit.user_id = user_user.friend_id
      WHERE visit.user_id = ${userId} OR user_user.user_id = ${userId}
      ORDER BY visit.created_at DESC
    `;

  const visits = result.rows.map(
    (row): VisitPlace => ({
      comment: row.comment,
      createdAt: Number(row.created_at),
      date: row.date,
      placeId: row.place_id,
      placeName: row.place_name,
      starred: row.starred,
      userId: row.user_id,
      userName: row.user_display_name,
    }),
  );
  return visits;
}
