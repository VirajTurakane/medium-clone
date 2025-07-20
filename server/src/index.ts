import { Hono } from "hono";
import { userRouter } from "./routes/user.route";
import { serverError } from "./utils/errors/serverError";
import { postRouter } from "./routes/post.route";

const app = new Hono();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", postRouter);

app.onError((err, c) => {
  return serverError(c);
});

export default app;
