import { hashToken } from "../utils/tokenManipulation";
import prismaClient from "../utils/prismaClient";

const client = prismaClient;

const registerRefreshToken = async (token: string, id: any) => {
  const hashedToken = await hashToken(token);
  await client.refresh_token.create({ data: { hashedToken, id } });
};

const revokeRefreshToken = async (id: any) => {
  await client.refresh_token.update({
    where: { id: id },
    data: {
      revoked: true,
    },
  });
};

export { registerRefreshToken, revokeRefreshToken };
