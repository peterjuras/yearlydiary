import { NextApiResponse } from "next";
import cookie from "cookie";

export function updateCookie(res: NextApiResponse, userId: string) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("userId", userId, {
      sameSite: true,
      path: "/",
      maxAge: 1735707600,
    }),
  );
}

export function deleteCookie(res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("userId", "", {
      sameSite: true,
      path: "/",
      maxAge: 0,
    }),
  );
}
