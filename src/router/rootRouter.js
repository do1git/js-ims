import express from "express";
import {
  getDoneList,
  home,
  getManage,
  getOutboundList,
} from "../controller/planController";
import { getEtc, getLogin, postLogin } from "../controller/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route("/").all(protectorMiddleware).get(home);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.route("/done").all(protectorMiddleware).get(getDoneList);
rootRouter.route("/outbound").all(protectorMiddleware).get(getOutboundList);
rootRouter.route("/manage").all(protectorMiddleware).get(getManage);
rootRouter.route("/etc").all(protectorMiddleware).get(getEtc);

export default rootRouter;
