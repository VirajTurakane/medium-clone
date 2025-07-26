import { Context } from "hono";

export const uploadToCloudinary = async (c: Context, file: File) => {
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", c.env.CLOUDINARY_API_KEY);
  form.append("timestamp", `${Math.floor(Date.now() / 1000)}`);
  form.append("upload_preset", c.env.CLOUDINARY_UNSIGNED_PRESET);

  const resp = await fetch(
    `https://api.cloudinary.com/v1_1/${c.env.CLOUDINARY_NAME}/auto/upload`,
    { method: "POST", body: form }
  );

  if (!resp.ok) {
    const text = await resp.text();
    return c.text(`Upload failed: ${text}`, 500);
  }

  const data = await resp.json();

  return data.secure_url;
};
