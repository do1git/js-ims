import express from "express";
import { getDoneList, home, manage } from "../controller/planController";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/done").get(getDoneList);
rootRouter.get("/manage", manage);

export default rootRouter;
