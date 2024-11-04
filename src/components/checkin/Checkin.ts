export interface Checkin {
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
