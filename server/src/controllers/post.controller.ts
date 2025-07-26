import { Context } from "hono";
import { errorLog } from "../utils/errors/errorLog";
import { errorResponse } from "../utils/errors/errorResponse";
import { uploadToCloudinary } from "../utils/helpers/uploadToCloudinary";
import { prisma } from "../config/prisma";
import { getCookie } from "hono/cookie";

export const post = async (c: Context) => {
  try {
    const body = await c.req.parseBody();

    const title: string = body.title as string;
    const content: string = body.content as string;
    const thumbnail = body.thumbnail as File | undefined;
    const categoryId: number = Number.parseInt(body.categoryId as string);
    const authorId: number = Number.parseInt(getCookie(c, "id")!);

    if (!thumbnail) return errorResponse(c, "No file uploaded");

    const thumbnailURL: string = await uploadToCloudinary(c, thumbnail);

    const newPost = await prisma.post.create({
      data: {
        thumbnail: thumbnailURL,
        title: title,
        content: content,
        authorId: authorId,
        categoryId: categoryId,
      },
    });

    return c.json({
      newPost,
    });
  } catch (error) {
    errorLog("Post", error);
  }
};
