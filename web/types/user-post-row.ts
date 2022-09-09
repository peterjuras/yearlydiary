export interface UserPostRow {
  [key: string]: UserPostRow[keyof UserPostRow];
  day: number;
  month: number;
  year: number;
  answer: string;
  created_at: number;
}
