import { sql } from "@vercel/postgres";
import { Checkin } from "./Checkin";

export async function createVisitRecord(visit: Checkin): Promise<void> {
  await sql`
    INSERT INTO checkin (comment, created_at, user_date, board_id, starred, user_id)
    VALUES (${visit.comment}, ${visit.createdAt}, ${visit.userDate}, ${visit.boardId}, ${visit.starred}, ${visit.userId})
  `;
}

export async function updateVisitRecord(visit: Checkin): Promise<void> {
  await sql`
    UPDATE checkin
    SET comment = ${visit.comment},
        starred = ${visit.starred}
    WHERE board_id = ${visit.boardId} AND user_id = ${visit.userId} AND user_date = ${visit.userDate}
  `;
}

export async function getUserVisitRecords(
  userId: string,
  boardId: string,
  options: { limit?: number; offset?: number } = {},
): Promise<Checkin[]> {
  const result = await sql`
    SELECT * FROM checkin
    WHERE user_id = ${userId} AND board_id = ${boardId}
    ORDER BY created_at DESC
    LIMIT ${options.limit || 10} OFFSET ${options.offset || 0}
  `;

  const visits = result.rows.map(
    (row): Checkin => ({
      id: row.id,
      comment: row.comment,
      createdAt: Number(row.created_at),
      userDate: row.user_date,
      boardId: row.board_id,
      starred: row.starred,
      userId: row.user_id,
    }),
  );
  return visits;
}
