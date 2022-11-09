import { sign } from "jsonwebtoken";
import { createHash } from "crypto";

const generateAccessToken = () => {
  const accessToken = sign(
    {
      usuario: "Davi",
    },
    String(process.env.ACCESS_TOKEN_SECRET),
    {
      expiresIn: "5m",
    },
  );

  return accessToken;
};

const generateRefreshToken = (id: string) => {
  const refreshToken = sign(
    {
      jti: id,
    },
    String(process.env.REFRESH_TOKEN_SECRET),
    {
      expiresIn: "1d",
    },
  );

  return refreshToken;
};

const hashToken = async (token: string) => {
  const hashedToken = await createHash("sha512").update(token).digest("hex");
  return hashedToken;
};

const generateTokens = (id: string) => {
  const accessToken = generateAccessToken();
  const refreshToken = generateRefreshToken(id);
  return { accessToken, refreshToken };
};

export { generateTokens, hashToken };
