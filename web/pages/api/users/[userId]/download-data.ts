import { NextApiRequest, NextApiResponse } from "next";
import { downloadData } from "../../../../lib/server/download-data";
import { sanitizeUserId } from "../../../../lib/server/sanitization";
import { validateUserId } from "../../../../lib/server/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { userId },
  } = req;

  switch (method) {
    case "GET": {
      const issues = [...validateUserId(userId)];
      if (issues.length) {
        res.status(400).send(["Bad Request", "", ...issues].join("\n"));
        return;
      }

      const sanitizedUserId = sanitizeUserId(userId as string);

      await downloadData(sanitizedUserId, res);
      break;
    }
    default:
      res.status(400).end();
  }
}
