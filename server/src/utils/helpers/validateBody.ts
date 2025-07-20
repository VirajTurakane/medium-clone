import { SafeParseReturnType } from "zod";

export const validateBody = <T>(body: SafeParseReturnType<T, T>): Boolean => {
  if (body.success) {
    return false;
  } else {
    return true;
  }
};
