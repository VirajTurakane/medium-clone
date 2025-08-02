import { Hono } from "hono";
import {
  deletePost,
  fetchAll,
  fetchByPostId,
  fetchByUserId,
  post,
  update,
} from "../controllers/post.controller";
import { configureCloudinary } from "../config/cloudinary";

export const postRouter = new Hono();

postRouter.use("*", async (c, next) => {
  configureCloudinary(c);
  await next();
});

postRouter.post("/post", post);
postRouter.get("/bulk", fetchAll);
postRouter.get("/:postId", fetchByPostId);
postRouter.get("/user/:userId", fetchByUserId);
postRouter.put("/edit", update);
postRouter.delete("/delete", deletePost);
