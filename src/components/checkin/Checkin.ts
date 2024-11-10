import { Board } from "../board/Board";
import { Profile } from "../user/Profile";

export interface CheckinRow {
  boardId: string;
  comment: string;
  createdAt: number;
  id: string;
  rate: CheckinRate;

  /**
   * "YYYY-MM-DD". The date the checkin was created.
   */
  userDate: string;

  userId: string;
}

export type CheckinRate = "+1" | "0" | "-1";

export interface Checkin<Type extends Board = Board> extends CheckinRow {
  board: Type;
  profile: Profile;
}
