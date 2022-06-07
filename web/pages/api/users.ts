import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../lib/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST": {
      const newUser = await createUser();

      res.json(newUser);
      break;
    }
    default:
      res.status(400).end();
  }
}
