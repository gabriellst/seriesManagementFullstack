import express from "express";
import loginRoute from "./routes/loginRoute";
import queryRoute from "./routes/queryRoute";
import refreshTokenRoute from "./routes/refreshTokenRoute";
import logoutRoute from "./routes/logoutRoute";
import { verifyAccessToken } from "./middleware/auth";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./utils/corsOptions";

const app = express();

const port = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Series Management API!");
});

app.use("/login", loginRoute);
app.use("/refresh", refreshTokenRoute);
app.use("/logout", logoutRoute);

app.use(verifyAccessToken);
app.use("/query", queryRoute);

app.listen(port, () => {
  console.log("API running on port: ", port);
});
