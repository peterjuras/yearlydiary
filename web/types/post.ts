import { z } from "zod";

export const postSchema = z.object({
  answer: z.string(),
  year: z.number(),
});
export type Post = z.infer<typeof postSchema>;
