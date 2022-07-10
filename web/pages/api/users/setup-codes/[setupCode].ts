import { NextApiRequest, NextApiResponse } from "next";
import { getUserInfoFromSetupCode } from "../../../../lib/server/db";
import { validateSetupCode } from "../../../../lib/server/validation";
import { User } from "../../../../types/user";

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

  const userInfoRaw = await getUserInfoFromSetupCode(sanitizedSetupCode);

  if (!userInfoRaw) {
    res.status(400).send("Bad Request");
    return;
  }

  const userInfo: User = {
    userId: userInfoRaw.user_id,
    publicPosts: userInfoRaw.public_posts,
  };

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
