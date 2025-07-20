import { Context } from "hono";
import { BlankEnv, BlankInput } from "hono/types";
import { errorResponse } from "./errorResponse";
import { serverErrorText } from "../constants/textConstants";

export const serverError = (c: Context<BlankEnv, string, BlankInput>) => {
  return errorResponse(c, serverErrorText);
};
