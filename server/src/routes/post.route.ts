import { Hono } from "hono";
import { post } from "../controllers/post.controller";
import { configureCloudinary } from "../config/cloudinary";

export const postRouter = new Hono();

postRouter.use("*", async (c, next) => {
  configureCloudinary(c);
  await next();
});

postRouter.post("/post", post);
