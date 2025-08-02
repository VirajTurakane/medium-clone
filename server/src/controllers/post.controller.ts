import { Context } from "hono";
import { errorLog } from "../utils/errors/errorLog";
import { errorResponse } from "../utils/errors/errorResponse";
import { uploadToCloudinary } from "../utils/helpers/uploadToCloudinary";
import { prisma } from "../config/prisma";
import { getCookie } from "hono/cookie";
import { updatePost } from "../utils/helpers/updatePost";
import { blogNotFound, noFileUploaded } from "../utils/constants/textConstants";
import { isPostExist } from "../utils/helpers/isPostExist";

export const post = async (c: Context) => {
  try {
    const body = await c.req.parseBody();

    const title: string = body.title as string;
    const content: string = body.content as string;
    const thumbnail = body.thumbnail as File | undefined;
    const categoryId: number = Number.parseInt(body.categoryId as string);
    const authorId: number = Number.parseInt(getCookie(c, "id")!);

    if (!thumbnail) return errorResponse(c, noFileUploaded);

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

export const fetchAll = async (c: Context) => {
  try {
    const posts = await prisma.post.findMany({});

    return c.json({
      posts,
    });
  } catch (error) {
    errorLog("FetchAll", error);
  }
};

export const fetchByPostId = async (c: Context) => {
  try {
    const id = c.req.param("postId");
    const post = await prisma.post.findMany({
      where: {
        id: Number.parseInt(id),
      },
    });

    return c.json({
      post,
    });
  } catch (error) {
    errorLog("FetchByPostId", error);
  }
};

export const fetchByUserId = async (c: Context) => {
  try {
    const id = c.req.param("userId");
    const post = await prisma.post.findMany({
      where: {
        authorId: Number.parseInt(id),
      },
    });

    return c.json({
      post,
    });
  } catch (error) {
    errorLog("FetchByUserId", error);
  }
};

export const update = async (c: Context) => {
  try {
    const body = await c.req.parseBody();

    const id: number = Number.parseInt(body.id as string);
    const title: string = body.title as string;
    const content: string = body.content as string;
    const thumbnail = body.thumbnail as File | undefined;
    const categoryId: number = Number.parseInt(body.categoryId as string);
    const authorId: number = Number.parseInt(getCookie(c, "id")!);

    const isExist = await isPostExist(c, id);

    if (!isExist.exists) {
      return errorResponse(c, blogNotFound);
    }

    const post = isExist.post;

    let thumbnailURL: string;

    if (thumbnail) {
      thumbnailURL = await uploadToCloudinary(c, thumbnail);

      const updatedPost = await updatePost(
        id,
        authorId ?? post.authorId,
        categoryId ?? post.categoryId,
        content ?? post.content,
        title ?? post.title,
        thumbnailURL
      );

      return c.json({
        updatedPost,
      });
    } else {
      const updatedPost = await updatePost(
        id,
        authorId ?? post.authorId,
        categoryId ?? post.categoryId,
        content ?? post.content,
        title ?? post.title,
        post.thumbnail
      );

      return c.json({
        updatedPost,
      });
    }
  } catch (error) {
    errorLog("Update", error);
  }
};

export const deletePost = async (c: Context) => {
  try {
    const body = await c.req.parseBody();

    const id = Number.parseInt(body.id as string);

    const isExist = await isPostExist(c, id);

    if (!isExist.exists) {
      return errorResponse(c, blogNotFound);
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return c.json({
      deletedPost,
    });
  } catch (error) {
    errorLog("Delete", error);
  }
};
