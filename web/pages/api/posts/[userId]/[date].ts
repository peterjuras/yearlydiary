import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { userId, date },
  } = req;

  console.log({ method, userId, date });

  res.status(204).end();
}
