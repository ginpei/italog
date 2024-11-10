import { sql } from "@vercel/postgres";
import { Checkin } from "../checkin/Checkin";
import { Place } from "../place/Place";

export async function getCheckinTimeline(
  userId: string,
): Promise<Checkin<Place>[]> {
  const limit = 30;
  const offset = 0;

  const result = await sql`
    SELECT c.*, b.board_type, b.display_name AS board_display_name, p.display_name AS profile_display_name, pl.latitude, pl.longitude, pl.address, pl.map_url, pl.type_display_name, pl.web_url
    FROM checkin c
    JOIN board b ON c.board_id = b.board_id
    JOIN profile p ON c.user_id = p.id
    LEFT JOIN place pl ON c.board_id = pl.board_id
    LEFT JOIN user_user uu ON c.user_id = uu.friend_id AND uu.user_id = ${userId}
    WHERE (uu.user_id = ${userId} OR c.user_id = ${userId})
    ORDER BY c.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const placeCheckin = result.rows.map(
    (row): Checkin<Place> => ({
      id: row.id,
      comment: row.comment,
      createdAt: Number(row.created_at),
      userDate: row.user_date,
      boardId: row.board_id,
      starred: row.starred,
      userId: row.user_id,
      board: {
        address: row.address,
        boardId: row.board_id,
        boardType: row.board_type,
        displayName: row.board_display_name,
        latitude: row.latitude,
        longitude: row.longitude,
        mapId: row.map_id,
        mapUrl: row.map_url,
        typeDisplayName: row.type_display_name,
        webUrl: row.web_url,
      },
      profile: {
        id: row.user_id,
        displayName: row.profile_display_name,
      },
    }),
  );
  return placeCheckin;
}
