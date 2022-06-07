import { NextApiRequest, NextApiResponse } from "next";
import { getPostsForDay } from "../../../../lib/server/db";
import { questions } from "../../../../lib/server/questions";
import {
  sanitizeDay,
  sanitizeMonth,
  sanitizeOffset,
} from "../../../../lib/server/sanitization";
import {
  validateDay,
  validateMonth,
  validateOffset,
} from "../../../../lib/server/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { day, month, offset },
  } = req;

  switch (method) {
    case "GET":
      // Validation
      const issues = [
        ...validateDay(day),
        ...validateMonth(month),
        ...validateOffset(offset),
      ];
      if (issues.length) {
        res.status(400).send(["Bad Request", "", ...issues].join("\n"));
        break;
      }

      const sanitizedDay = sanitizeDay(day as string);
      const sanitizedMonth = sanitizeMonth(month as string);
      const sanitizedOffset = sanitizeOffset(offset as string);

      const question = questions[sanitizedMonth][sanitizedDay];
      const answers = await getPostsForDay(
        sanitizedDay,
        sanitizedMonth,
        sanitizedOffset
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
