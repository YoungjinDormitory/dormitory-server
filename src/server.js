import express from "express";
import morgan from "morgan";
import path from "path";
import db from "./models";
import cookieParser from "cookie-parser";
import cors from "cors";
import { deserializeUser } from "./middlewares";
import {
  rootRouter,
  busInfoRouter,
  asRouter,
  hlthRouter,
  stayoutRouter,
  hotRouter,
  bulletinRouter,
  commentRouter,
  menuRouter,
  noticeRouter,
  agreeRouter,
} from "./routers";
import busRouter from "./routers/busRouter";

const app = express();
const logger = morgan("dev");

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cookieParser());
app.use(logger);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));

app.use(
  cors({
    origin: [process.env.NODE_ENV === "development" ? process.env.DEV_CLIENT_DOMAIN : process.env.PRODUCT_CLIENT_DOMAIN],
    credentials: true,
  })
);

app.use(deserializeUser);

app.use("/", rootRouter);
app.use("/bus", busRouter);
app.use("/businfo", busInfoRouter);
app.use("/as", asRouter);
app.use("/hlth", hlthRouter);
app.use("/notice", noticeRouter);
app.use("/stayout", stayoutRouter);
app.use("/hot", hotRouter);
app.use("/bulletin", bulletinRouter);
app.use("/comment", commentRouter);
app.use("/menu", menuRouter);
app.use("/agree", agreeRouter);

export default app;
