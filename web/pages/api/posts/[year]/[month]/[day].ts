import { NextApiRequest, NextApiResponse } from "next";
import { getPosts } from "../../../../../lib-server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { day, month, year, offset },
  } = req;

  switch (method) {
    case "GET":
      // TODO: Validation
      const answers = await getPosts(
        parseInt(day as string),
        parseInt(month as string),
        parseInt(year as string),
        parseInt((offset as string) || "0")
      );

      res.json(answers);
      break;
    default:
      res.status(400).end();
  }
}
