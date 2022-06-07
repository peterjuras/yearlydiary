import { NextApiRequest, NextApiResponse } from "next";
import { updateUser } from "../../../lib-server/db";

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
    case "PUT": {
      const { publicPosts } = JSON.parse(body);
      // TODO: Validation, sanitization
      await updateUser(userId as string, publicPosts);
      res.status(204).end();
      break;
    }
    default:
      res.status(400).end();
  }
}
