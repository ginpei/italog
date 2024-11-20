import { Board } from "../board/Board";

export function getBoardViewPageUrl(
  board: Pick<Board, "boardType" | "boardId">,
): string {
  return `/${board.boardType}/${board.boardId}`;
}
