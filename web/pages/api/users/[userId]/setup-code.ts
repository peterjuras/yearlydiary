import { NextApiRequest, NextApiResponse } from "next";
import { insertSetupCode } from "../../../../lib/server/db";
import { sanitizeUserId } from "../../../../lib/server/sanitization";
import {
  generateCode,
  generateExpiryDate,
} from "../../../../lib/server/setup-codes";
import { validateUserId } from "../../../../lib/server/validation";

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { userId },
  } = req;

  const issues = [...validateUserId(userId)];
  if (issues.length) {
    res.status(400).send(["Bad Request", "", ...issues].join("\n"));
    return;
  }

  const sanitizedUserId = sanitizeUserId(userId as string);

  const code = generateCode();
  const expiryDate = generateExpiryDate();

  await insertSetupCode(sanitizedUserId, code, expiryDate);

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
    case "POST":
      await postHandler(req, res);
      break;
    default:
      res.status(400).end();
  }
}
