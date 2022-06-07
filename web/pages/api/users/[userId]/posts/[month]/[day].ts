import { NextApiRequest, NextApiResponse } from "next";
import { getUserPostsForDay } from "../../../../../../lib/server/db";
import { questions } from "../../../../../../lib/server/questions";
import {
  sanitizeDay,
  sanitizeMonth,
  sanitizeUserId,
} from "../../../../../../lib/server/sanitization";
import {
  validateDay,
  validateMonth,
  validateUserId,
} from "../../../../../../lib/server/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { userId, day, month },
  } = req;

  switch (method) {
    case "GET":
      // Validation
      const issues = [
        ...validateDay(day),
        ...validateMonth(month),
        ...validateUserId(userId),
      ];
      if (issues.length) {
        res.status(400).send(["Bad Request", "", ...issues].join("\n"));
        break;
      }

      const sanitizedDay = sanitizeDay(day as string);
      const sanitizedMonth = sanitizeMonth(month as string);
      const sanitizedUserId = sanitizeUserId(userId as string);

      const question = questions[sanitizedMonth][sanitizedDay];

      const answers = await getUserPostsForDay(
        sanitizedUserId,
        sanitizedDay,
        sanitizedMonth
      );

      res.json({
        question,
        answers,
      });
      break;
    default:
      res.status(400).end();
  }
}
