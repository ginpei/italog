export interface Board {
  boardId: string;
  boardType: BoardType;
  displayName: string;
}

export type BoardType = "place" | "product";
