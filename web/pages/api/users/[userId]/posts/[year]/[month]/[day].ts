import { NextApiRequest, NextApiResponse } from "next";
import { getPost } from "../../../../../../../lib-server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { userId, day, month, year },
  } = req;

  switch (method) {
    case "GET":
      // TODO: Validation

      const answer = await getPost(
        userId as string,
        parseInt(day as string),
        parseInt(month as string),
        parseInt(year as string)
      );

      res.json({
        answer,
      });
      break;
    default:
      res.status(400).end();
  }
}
