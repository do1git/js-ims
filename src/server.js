import express from "express";
import rootRouter from "./router/rootRouter";
import pumpRouter from "./router/pumpRouter";
import planRouter from "./router/planRouter";
import userRouter from "./router/userRouter";
import morgan from "morgan";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/plans", planRouter);
app.use("/pumps", pumpRouter);

export default app;
