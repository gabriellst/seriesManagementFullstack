import express from "express";
import handleLoginAuth from "../controllers/loginController"

const loginRoute = express.Router();

loginRoute.post("/", handleLoginAuth)

export default loginRoute
