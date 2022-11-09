import { verifyRefreshToken } from "../middleware/auth";
import express from "express";
import logoutHandler from "../controllers/logoutController";

const logoutRoute = express.Router();

logoutRoute.post("/", verifyRefreshToken, logoutHandler, () => {});

export default logoutRoute;
