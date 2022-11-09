import { verifyRefreshToken, refreshCycle } from "../middleware/auth";
import express from "express";

const refreshTokenRoute = express.Router();

refreshTokenRoute.get("/", verifyRefreshToken, refreshCycle, () => {});

export default refreshTokenRoute;
