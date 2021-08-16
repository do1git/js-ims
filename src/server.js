import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./router/rootRouter";
import pumpRouter from "./router/pumpRouter";
import planRouter from "./router/planRouter";
import userRouter from "./router/userRouter";
import morgan from "morgan";
import { localsMiddleware, publicOnlyMiddleware } from "./middlewares";
import { ProvidePlugin } from "webpack";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/plans", planRouter);
app.use("/pumps", pumpRouter);
app.use("/users", userRouter);

export default app;
