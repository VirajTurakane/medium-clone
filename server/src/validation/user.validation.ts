import { z } from "zod";

export const validateSignupBody = z.object({
  name: z.string().optional(),
  email: z.string(),
  password: z.string(),
  profilePhoto: z.string().optional(),
});

export const validateLoginBody = z.object({
  email: z.string(),
  password: z.string(),
});
