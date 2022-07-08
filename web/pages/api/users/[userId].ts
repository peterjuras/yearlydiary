import { NextApiRequest, NextApiResponse } from "next";
import { deleteUser, updateUser } from "../../../lib/server/db";
import { sanitizeUserId } from "../../../lib/server/sanitization";
import {
  validatePublicPosts,
  validateUserId,
} from "../../../lib/server/validation";

async function putHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { userId },
    body,
  } = req;

  const { publicPosts } = JSON.parse(body);

  // Validation
  const issues = [
    ...validateUserId(userId),
    ...validatePublicPosts(publicPosts),
  ];
  if (issues.length) {
    res.status(400).send(["Bad Request", "", ...issues].join("\n"));
    return;
  }

  const sanitizedUserId = sanitizeUserId(userId as string);

  await updateUser(sanitizedUserId, publicPosts);
  res.status(204).end();
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { userId },
  } = req;

  // Validation
  const issues = [...validateUserId(userId)];
  if (issues.length) {
    res.status(400).send(["Bad Request", "", ...issues].join("\n"));
    return;
  }

  const sanitizedUserId = sanitizeUserId(userId as string);

  await deleteUser(sanitizedUserId);

  res.status(204).end();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "PUT":
      await putHandler(req, res);
      break;
    case "DELETE":
      await deleteHandler(req, res);
      break;
    default:
      res.status(400).end();
  }
}
