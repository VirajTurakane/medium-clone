import { Context } from "hono";
import { BlankEnv, BlankInput } from "hono/types";

export const errorResponse = (
  c: Context<BlankEnv, string, BlankInput>,
  message: string
) => {
  return c.json({
    success: false,
    message: message,
  });
};
