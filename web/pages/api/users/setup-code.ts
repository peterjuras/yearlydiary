import { NextApiRequest, NextApiResponse } from "next";
import { createUser, insertSetupCode } from "../../../lib/server/db";
import { sanitizeUserId } from "../../../lib/server/sanitization";
import {
  generateCode,
  generateExpiryDate,
} from "../../../lib/server/setup-codes";
import { updateCookie } from "../../../lib/server/update-cookie";
import { validateUserId } from "../../../lib/server/validation";

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    cookies: { userId: providedUserId },
  } = req;

  let userId = providedUserId;
  if (!userId) {
    ({ userId } = await createUser());
  }

  const issues = [...validateUserId(userId)];
  if (issues.length) {
    res.status(400).send(["Bad Request", "", ...issues].join("\n"));
    return;
  }

  const sanitizedUserId = sanitizeUserId(userId as string);

  const code = generateCode();
  const expiryDate = generateExpiryDate();

  await insertSetupCode(sanitizedUserId, code, expiryDate);

  updateCookie(res, sanitizedUserId);

  res.json({
    code,
    expiryDate,
  });
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
    default:
      res.status(400).end();
  }
}
