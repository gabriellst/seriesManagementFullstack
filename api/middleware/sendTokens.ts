import { Request, Response } from "express";
import { registerRefreshToken } from "../controllers/refreshTokenController";
import { generateTokens } from "../utils/tokenManipulation";
import { v4 } from "uuid";

const sendTokens = (req: Request, res: Response) => {
  const id = v4();
  const { accessToken, refreshToken } = generateTokens(id);
  registerRefreshToken(refreshToken, id);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({
    accessToken,
  });
};

export default sendTokens;
