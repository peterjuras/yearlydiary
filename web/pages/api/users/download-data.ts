import { NextApiRequest, NextApiResponse } from "next";
import { downloadData } from "../../../lib/server/download-data";
import { sanitizeUserId } from "../../../lib/server/sanitization";
import { updateCookie } from "../../../lib/server/update-cookie";
import { validateUserId } from "../../../lib/server/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    cookies: { userId },
  } = req;

  if (!userId) {
    res.status(403).end();
    return;
  }

  switch (method) {
    case "GET": {
      const issues = [...validateUserId(userId)];
      if (issues.length) {
        res.status(400).send(["Bad Request", "", ...issues].join("\n"));
        return;
      }

      const sanitizedUserId = sanitizeUserId(userId as string);

      updateCookie(res, sanitizedUserId);

      await downloadData(sanitizedUserId, res);
      break;
    }
    default:
      res.status(400).end();
  }
}
