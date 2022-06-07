import { NextApiRequest, NextApiResponse } from "next";
import { getUserPostsForDay } from "../../../../../../lib/server/db";
import { questions } from "../../../../../../lib/server/questions";

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
      // TODO: Validation
      const numericDay = parseInt(day as string);
      const numericMonth = parseInt(month as string);

      const question = questions[numericMonth][numericDay];

      const answers = await getUserPostsForDay(
        userId as string,
        numericDay,
        numericMonth
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
