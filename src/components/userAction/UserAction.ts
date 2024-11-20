export interface UserAction {
  createdAt: number;
  detail: Record<string, unknown>;
  id: string;
  title: string;
  userDisplayName: string;
  userId: string;
}
