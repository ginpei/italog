import { VercelPoolClient } from "@vercel/postgres";
import { Board } from "./Board";

export function createBoardRecord(
  client: VercelPoolClient,
  board: Omit<Board, "boardId">,
): Promise<string> {
  return client
    .query(
      /*sql*/ `
        INSERT INTO board (board_type, display_name) VALUES ($1, $2) RETURNING board_id
      `,
      [board.boardType, board.displayName],
    )
    .then((result) => {
      return result.rows[0].board_id;
    });
}
