export interface UserEntryRow {
  [key: string]: UserEntryRow[keyof UserEntryRow];
  user_id: string;
  public_posts: boolean;
  created_at: number;
}
