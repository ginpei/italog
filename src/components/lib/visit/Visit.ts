export interface Visit {
  comment: string;
  createdAt: number;

  /**
   * Date of the visit in the format "YYYY-MM-DD".
   */
  date: string;

  placeId: string;
  starred: boolean;
  userId: string;
}
