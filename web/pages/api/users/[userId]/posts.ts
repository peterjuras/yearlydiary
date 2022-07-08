import { NextApiRequest, NextApiResponse } from "next";
import { getPostDatesForUser, storePost } from "../../../../lib/server/db";
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

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { userId },
  } = req;

  const issues = [...validateUserId(userId)];
  if (issues.length) {
    res.status(400).send(["Bad Request", "", ...issues].join("\n"));
    return;
  }

  const sanitizedUserId = sanitizeUserId(userId as string);

  const userPostDates = await getPostDatesForUser(sanitizedUserId);

  const result = {
    postDates: userPostDates,
  };

  res.json(result);
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { userId },
    body,
  } = req;

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
    return;
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
    return;
  }

  await storePost(
    sanitizedUserId,
    sanitizedDay,
    sanitizedMonth,
    sanitizedYear,
    sanitizedAnswer
  );
  res.status(204).end();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      await getHandler(req, res);
      break;
    case "POST":
      await postHandler(req, res);
      break;
    default:
      res.status(400).end();
  }
}
