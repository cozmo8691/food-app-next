import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";
import getConfig from "next/config";
import { JwtPayload } from "jsonwebtoken";

interface IJwtPayload {
  id: number;
}

const {
  serverRuntimeConfig: { JWTSecret },
} = getConfig();

export const validateRoute = (
  handler: (req: NextApiRequest, res: NextApiResponse, user: any) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.LISTAPP_ACCESS_TOKEN;

    type customPayload = JwtPayload & { id: number };

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, JWTSecret) as customPayload;
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorizied" });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorizied" });
  };
};

export const validateToken = (token: string) => {
  const user = jwt.verify(token, JWTSecret) as IJwtPayload;
  return user;
};
