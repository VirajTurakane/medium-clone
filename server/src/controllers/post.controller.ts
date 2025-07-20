import { Context } from "hono";
import { errorLog } from "../utils/errors/errorLog";
import { v2 as cloudinary } from "cloudinary";

export const post = async (c: Context) => {
  try {
    const body = await c.req.parseBody();

    const file = body["file"] as File;

    // cloudinary.uploader.upload(file)

    return c.json({
      
    });
  } catch (error) {
    errorLog("Post", error);
  }
};
