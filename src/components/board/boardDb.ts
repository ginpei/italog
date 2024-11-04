import { VercelPoolClient } from "@vercel/postgres";
import { BoardType } from "./Board";

export function createBoardRecord(
  client: VercelPoolClient,
  type: BoardType,
): Promise<string> {
  return client
    .query(
      /*sql*/ `
        INSERT INTO board (type) VALUES ($1) RETURNING id
      `,
      [type],
    )
    .then((result) => {
      return result.rows[0].id;
    });
}
