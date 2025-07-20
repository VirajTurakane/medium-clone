import { Hono } from "hono";
import { login, signup, user } from "../controllers/user.controller";

export const userRouter = new Hono();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/:id", user);
