import { Request, Response, NextFunction } from "express";
import { senha_ } from "@prisma/client";
import prismaClient from "../utils/prismaClient";
import sendTokens from "../middleware/sendTokens";

const client = prismaClient;

const handleLoginAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  const queryResult = (await client.senha_.findFirst()) as senha_;

  if (!queryResult) {
    return res.status(404).send({ message: "No password found in the database" });
  }

  const dbPassword: string | null = queryResult["senha"];

  if (password === dbPassword) {
    return sendTokens(req, res);
  }

  return res.status(403).send({ message: "Incorrect password" });
};

export default handleLoginAuth;
