import { sql } from "@vercel/postgres";
import { runTransaction } from "../db/transaction";

export async function hasFriendshipRecord(
  userId1: string,
  userId2: string,
): Promise<boolean> {
  const result = await sql`
    SELECT COUNT(*) FROM user_user
    WHERE user_id = ${userId1} AND friend_id = ${userId2}
  `;
  return result.rows[0].count > 0;
}

export async function createFriendshipRecord(
  userId1: string,
  userId2: string,
  createdAt: number,
): Promise<void> {
  await runTransaction(async (client) => {
    const sql = /*sql*/ `
      INSERT INTO user_user (user_id, friend_id, created_at) VALUES ($1, $2, $3)
    `;
    await Promise.all([
      client.query(sql, [userId1, userId2, createdAt]),
      client.query(sql, [userId2, userId1, createdAt]),
    ]);
  });
}

export async function deleteFriendshipRecord(
  userId1: string,
  userId2: string,
): Promise<void> {
  await runTransaction(async (client) => {
    const sql = /*sql*/ `
      DELETE FROM user_user WHERE user_id = $1 AND friend_id = $2
    `;
    await Promise.all([
      client.query(sql, [userId1, userId2]),
      client.query(sql, [userId2, userId1]),
    ]);
  });
}
