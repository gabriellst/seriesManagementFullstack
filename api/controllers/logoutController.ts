import { Request, Response } from "express";

const logoutHandler = async (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  return res.status(200).send({ message: "Successfully Logged out" });
};

export default logoutHandler;
