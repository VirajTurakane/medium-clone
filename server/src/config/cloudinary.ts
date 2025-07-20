import { v2 as cloudinary } from "cloudinary";
import { Context } from "hono";
import { env } from "hono/adapter";

export const configureCloudinary = (c: Context) => {
  const { CLOUDINARY_API_KEY } = env<{ CLOUDINARY_API_KEY: string }>(c);
  const { CLOUDINARY_API_SECRET } = env<{ CLOUDINARY_API_SECRET: string }>(c);
  const { CLOUDINARY_NAME } = env<{ CLOUDINARY_NAME: string }>(c);

  cloudinary.config({
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    cname: CLOUDINARY_NAME,
  });
};
