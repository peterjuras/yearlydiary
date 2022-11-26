import { z } from "zod";

export const answerSchema = z.object({
  answer: z.string(),
  year: z.number(),
});
export type Answer = z.infer<typeof answerSchema>;
