import { Context } from "hono";
import { prisma } from "../../config/prisma";

export const isPostExist = async (c: Context, id: number) => {
  const isExist = await prisma.post.findMany({
    where: {
      id: id,
    },
  });

  if (isExist.length === 0) {
    return {
      post: isExist[0],
      exists: false,
    };
  } else {
    return {
      post: isExist[0],
      exists: true,
    };
  }
};
