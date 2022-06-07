import { NextApiRequest, NextApiResponse } from "next";
import { updateUser } from "../../../lib/server/db";
import { sanitizeUserId } from "../../../lib/server/sanitization";
import {
  validatePublicPosts,
  validateUserId,
} from "../../../lib/server/validation";

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

      // Validation
      const issues = [
        ...validateUserId(userId),
        ...validatePublicPosts(publicPosts),
      ];
      if (issues.length) {
        res.status(400).send(["Bad Request", "", ...issues].join("\n"));
        break;
      }

      const sanitizedUserId = sanitizeUserId(userId as string);

      await updateUser(sanitizedUserId, publicPosts);
      res.status(204).end();
      break;
    }
    default:
      res.status(400).end();
  }
}
