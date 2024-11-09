import { sql } from "@vercel/postgres";
import { CheckinRow } from "./Checkin";

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

export async function getUserCheckinRecords(
  userId: string,
  boardId: string,
  options: { limit?: number; offset?: number } = {},
): Promise<CheckinRow[]> {
  const result = await sql`
    SELECT * FROM checkin
    WHERE user_id = ${userId} AND board_id = ${boardId}
    ORDER BY created_at DESC
    LIMIT ${options.limit || 10} OFFSET ${options.offset || 0}
  `;

  const checkins = result.rows.map(
    (row): CheckinRow => ({
      id: row.id,
      comment: row.comment,
      createdAt: Number(row.created_at),
      userDate: row.user_date,
      boardId: row.board_id,
      starred: row.starred,
      userId: row.user_id,
    }),
  );
  return checkins;
}
