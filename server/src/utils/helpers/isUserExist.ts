import { prisma } from "../../config/prisma";
import { errorLog } from "../errors/errorLog";

export const isUserExist = async (email: string) => {
  try {
    const isExist = await prisma.user.findMany({
      where: {
        email: email,
      },
    });
    return isExist;
  } catch (error) {
    errorLog("IsUserExist Error :", error);
  }
};
