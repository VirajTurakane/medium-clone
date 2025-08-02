import { prisma } from "../../config/prisma";

export const updatePost = async (
  id: number,
  authorId: number,
  categoryId: number,
  content: string,
  title: string,
  thumbnailURL: string
) => {
  return await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      authorId: authorId,
      categoryId: categoryId,
      content: content,
      thumbnail: thumbnailURL,
      title: title,
    },
  });
};
