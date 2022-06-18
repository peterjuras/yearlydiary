import { NextApiRequest, NextApiResponse } from "next";
import { storePost } from "../../../../lib/server/db";
import {
  sanitizeAnswer,
  sanitizeDay,
  sanitizeMonth,
  sanitizeUserId,
  sanitizeYear,
} from "../../../../lib/server/sanitization";
import {
  validateAnswer,
  validateDay,
  validateMonth,
  validatePostDate,
  validateUserId,
  validateYear,
} from "../../../../lib/server/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { userId },
    body,
  } = req;

  switch (method) {
    case "POST": {
      const { day, month, year, answer } = JSON.parse(body);
      // Validation
      const issues = [
        ...validateDay(day),
        ...validateMonth(month),
        ...validateYear(year),
        ...validateUserId(userId),
        ...validateAnswer(answer),
      ];
      if (issues.length) {
        res.status(400).send(["Bad Request", "", ...issues].join("\n"));
        break;
      }

      const sanitizedDay = sanitizeDay(day as string);
      const sanitizedMonth = sanitizeMonth(month as string);
      const sanitizedYear = sanitizeYear(year as string);
      const sanitizedUserId = sanitizeUserId(userId as string);
      const sanitizedAnswer = sanitizeAnswer(answer as string);

      const postIssues = [
        ...validatePostDate(
          new Date(),
          sanitizedYear,
          sanitizedMonth,
          sanitizedDay
        ),
      ];
      if (postIssues.length) {
        res.status(400).send(["Bad Request", "", ...postIssues].join("\n"));
        break;
      }

      await storePost(
        sanitizedUserId,
        sanitizedDay,
        sanitizedMonth,
        sanitizedYear,
        sanitizedAnswer
      );
      res.status(204).end();
      break;
    }
    default:
      res.status(400).end();
  }
}
