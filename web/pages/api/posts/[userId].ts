import { NextApiRequest, NextApiResponse } from "next";
import { storePost } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { userId },
    body,
  } = req;

  console.log({ method, userId, body });

  switch (method) {
    case "GET":
      res.status(204).end();
      break;
    case "POST":
      const { day, month, year, answer } = body;
      // TODO: Validation, sanitization
      await storePost(userId as string, day, month, year, answer);
      res.status(204).end();
      break;
    default:
      res.status(400).end();
  }
}
