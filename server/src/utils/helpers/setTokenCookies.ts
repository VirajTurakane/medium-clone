import { Context } from "hono";
import { setCookie } from "hono/cookie";

export const setTokenCookie = (c: Context, token: string) => {
  setCookie(c, "token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60,
  });
};
