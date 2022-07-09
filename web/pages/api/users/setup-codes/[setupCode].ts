import { NextApiRequest, NextApiResponse } from "next";
import { getUserInfoFromSetupCode } from "../../../../lib/server/db";
import { validateSetupCode } from "../../../../lib/server/validation";

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { setupCode },
  } = req;

  const issues = [...validateSetupCode(setupCode)];
  if (issues.length) {
    res.status(400).send(["Bad Request", "", ...issues].join("\n"));
    return;
  }

  // No sanitization needed after validation
  const sanitizedSetupCode = setupCode as string;

  const userInfo = await getUserInfoFromSetupCode(sanitizedSetupCode);

  if (!userInfo) {
    res.status(400).send("Bad Request");
    return;
  }
  res.json(userInfo);
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
