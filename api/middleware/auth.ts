import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { revokeRefreshToken } from "../controllers/refreshTokenController";
import { hashToken } from "../utils/tokenManipulation";
import prismaClient from "../utils/prismaClient";
import sendTokens from "./sendTokens";

const client = prismaClient;

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerAuthorization = req.headers["authorization"];
  const accessToken = bearerAuthorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(400).send({ message: "Access token not provided" });
  }

  try {
    verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
  } catch (e: any) {
    return res.status(401).send({ message: "Access token is invalid" });
  }
  next();
};

const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  const jwt = cookies.jwt;

  if (!jwt) {
    return res.status(400).send({ message: "Refresh token not provided" });
  }

  try {
    const payload = verify(jwt, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
    const { jti } = payload;

    const databaseRefreshToken = await client.refresh_token.findFirst({ where: { id: jti } });
    const hashedJwt = await hashToken(jwt);

    if (hashedJwt != databaseRefreshToken?.hashedToken) {
      return res.send("Unauthorized").status(401);
    }

    if (!databaseRefreshToken?.revoked) {
      revokeRefreshToken(jti);
      next();
    } else {
      return res.send({ message: "Token revoked" }).status(403);
    }
  } catch (e: any) {
    return res.send({ message: e.message }).status(500);
  }
};

const refreshCycle = (req: Request, res: Response) => {
  sendTokens(req, res);
};

export { verifyAccessToken, verifyRefreshToken, refreshCycle };
