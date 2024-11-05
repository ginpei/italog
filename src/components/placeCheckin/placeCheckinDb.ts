import { sql } from "@vercel/postgres";
import { PlaceCheckin } from "./PlaceCheckin";

export async function getUserPlaceCheckin(
  userId: string,
  options: { limit?: number; offset?: number } = {},
): Promise<PlaceCheckin[]> {
  const result = await sql`
      SELECT checkin.*, board.display_name as place_name, profile.display_name as user_display_name
      FROM checkin
      JOIN board ON checkin.board_id = board.board_id
      JOIN profile ON checkin.user_id = profile.id
      WHERE checkin.user_id = ${userId}
      ORDER BY checkin.created_at DESC
      LIMIT ${options.limit || 10} OFFSET ${options.offset || 0}
    `;

  const placeCheckin = result.rows.map(
    (row): PlaceCheckin => ({
      boardId: row.board_id,
      comment: row.comment,
      createdAt: Number(row.created_at),
      id: row.id,
      placeName: row.place_name,
      starred: row.starred,
      userDate: row.user_date,
      userId: row.user_id,
      userName: row.user_display_name,
    }),
  );
  return placeCheckin;
}

export async function getCheckinTimeline(
  userId: string,
): Promise<PlaceCheckin[]> {
  const result = await sql`
      SELECT checkin.*, board.display_name as place_name, profile.display_name as user_display_name
      FROM checkin
      JOIN board ON checkin.board_id = board.board_id
      JOIN profile ON checkin.user_id = profile.id
      LEFT JOIN user_user ON checkin.user_id = user_user.friend_id
      WHERE checkin.user_id = ${userId} OR user_user.user_id = ${userId}
      ORDER BY checkin.created_at DESC
    `;

  const placeCheckin = result.rows.map(
    (row): PlaceCheckin => ({
      boardId: row.board_id,
      comment: row.comment,
      createdAt: Number(row.created_at),
      id: row.id,
      placeName: row.place_name,
      starred: row.starred,
      userDate: row.user_date,
      userId: row.user_id,
      userName: row.user_display_name,
    }),
  );
  return placeCheckin;
}
