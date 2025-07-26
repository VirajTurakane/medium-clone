import { Context } from "hono";

export const errorResponse = (
  c: Context,
  message: string
) => {
  return c.json({
    success: false,
    message: message,
  });
};
