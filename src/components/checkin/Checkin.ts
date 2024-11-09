import { Board } from "../board/Board";
import { Profile } from "../user/Profile";

export interface CheckinRow {
  boardId: string;
  comment: string;
  createdAt: number;
  id: string;
  starred: boolean;

  /**
   * "YYYY-MM-DD". The date the checkin was created.
   */
  userDate: string;

  userId: string;
}

export interface Checkin<Type extends Board = Board> extends CheckinRow {
  board: Type;
  profile: Profile;
}
