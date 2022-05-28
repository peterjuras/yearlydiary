import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { date },
  } = req;

  console.log({ method, date });

  res.status(204).end();
}
