import { Context } from "hono";
import { errorLog } from "../utils/errors/errorLog";
import {
  validateLoginBody,
  validateSignupBody,
} from "../validation/user.validation";
import { validateBody } from "../utils/helpers/validateBody";
import { prisma } from "../config/prisma";
import { errorResponse } from "../utils/errors/errorResponse";
import {
  incorrectPassword,
  invalidData,
  userAlreadyExist,
  userDoesNotExist,
} from "../utils/constants/textConstants";
import jwt from "jsonwebtoken";
import { env } from "hono/adapter";
import { setTokenCookie } from "../utils/helpers/setTokenCookies";
import { isUserExist } from "../utils/helpers/isUserExist";
import bcrypt from "bcryptjs";
("bcryptjs");

export const signup = async (c: Context) => {
  try {
    const body = validateSignupBody.safeParse(await c.req.json());

    if (validateBody(body)) {
      return errorResponse(c, invalidData);
    }

    const data = body!.data!;

    const isExist = await isUserExist(data.email);

    if (isExist!.length !== 0) {
      return errorResponse(c, userAlreadyExist);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        profilePhoto: data.profilePhoto,
      },
    });

    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);

    const token = jwt.sign({ email: data.email }, JWT_SECRET, {
      expiresIn: "30d",
    });

    setTokenCookie(c, token, user.id.toString());

    return c.json({
      sucess: true,
      user: {
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    errorLog("Signup", error);
  }
};

export const login = async (c: Context) => {
  try {
    const body = validateLoginBody.safeParse(await c.req.json());

    if (validateBody(body)) {
      return errorResponse(c, invalidData);
    }
    const data = body!.data!;

    const isExist = await isUserExist(data.email);

    if (isExist!.length === 0) {
      return errorResponse(c, userDoesNotExist);
    }

    const { name, email, profilePhoto, password } = isExist![0];

    const isMatch = await bcrypt.compare(data.password, password);

    if (!isMatch) {
      return errorResponse(c, incorrectPassword);
    }

    return c.json({
      success: true,
      user: {
        name: name,
        email: email,
        profilePhoto: profilePhoto,
      },
    });
  } catch (error) {
    errorLog("Login", error);
  }
};

export const user = async (c: Context) => {
  try {
    const id = c.req.param("id");

    const user = await prisma.user.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });

    if (!user) {
      return errorResponse(c, userDoesNotExist);
    }

    return c.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    errorLog("User By ID", error);
  }
};
