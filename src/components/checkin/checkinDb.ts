import { sql } from "@vercel/postgres";
import { Checkin, CheckinRow } from "./Checkin";

export async function createCheckinRecord(checkin: CheckinRow): Promise<void> {
  await sql`
    INSERT INTO checkin (comment, created_at, user_date, board_id, starred, user_id)
    VALUES (${checkin.comment}, ${checkin.createdAt}, ${checkin.userDate}, ${checkin.boardId}, ${checkin.starred}, ${checkin.userId})
  `;
}

export async function updateCheckinRecord(checkin: CheckinRow): Promise<void> {
  await sql`
    UPDATE checkin
    SET comment = ${checkin.comment},
        starred = ${checkin.starred}
    WHERE board_id = ${checkin.boardId} AND user_id = ${checkin.userId} AND user_date = ${checkin.userDate}
  `;
}

export async function getCheckinRecordsOn(
  userId: string,
  boardId: string,
  options: { limit?: number; offset?: number } = {},
): Promise<Checkin[]> {
  const result = await sql`
    SELECT c.*, b.board_type, b.display_name AS board_display_name, p.display_name AS profile_display_name
    FROM checkin c
    JOIN board b ON c.board_id = b.board_id
    JOIN profile p ON c.user_id = p.id
    LEFT JOIN user_user uu ON c.user_id = uu.friend_id AND uu.user_id = ${userId}
    WHERE c.board_id = ${boardId} AND (uu.user_id = ${userId} OR c.user_id = ${userId})
    ORDER BY c.created_at DESC
    LIMIT ${options.limit || 10} OFFSET ${options.offset || 0}
  `;

  const checkins = result.rows.map(
    (row): Checkin => ({
      id: row.id,
      comment: row.comment,
      createdAt: Number(row.created_at),
      userDate: row.user_date,
      boardId: row.board_id,
      starred: row.starred,
      userId: row.user_id,
      board: {
        boardId: row.board_id,
        boardType: row.board_type,
        displayName: row.board_display_name,
      },
      profile: {
        id: row.user_id,
        displayName: row.profile_display_name,
      },
    }),
  );
  return checkins;
}

export async function getUserCheckinRecords(
  userId: string,
): Promise<Checkin[]> {
  const limit = 10;
  const offset = 0;

  const result = await sql`
    SELECT c.*, b.board_type, b.display_name AS board_display_name, p.display_name AS profile_display_name
    FROM checkin c
    JOIN board b ON c.board_id = b.board_id
    JOIN profile p ON c.user_id = p.id
    WHERE c.user_id = ${userId}
    ORDER BY c.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const checkins = result.rows.map(
    (row): Checkin => ({
      id: row.id,
      comment: row.comment,
      createdAt: Number(row.created_at),
      userDate: row.user_date,
      boardId: row.board_id,
      starred: row.starred,
      userId: row.user_id,
      board: {
        boardId: row.board_id,
        boardType: row.board_type,
        displayName: row.board_display_name,
      },
      profile: {
        id: row.user_id,
        displayName: row.profile_display_name,
      },
    }),
  );
  return checkins;
}
