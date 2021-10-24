import express from "express";
import {
  getDoneList,
  home,
  getManage,
  getOutboundList,
  home_search,
  outbound_search,
  getDailyReport,
} from "../controller/planController";
import { getEtc, getLogin, postLogin } from "../controller/userController";
import {
  protectorMiddleware,
  protectorMiddleware_plan,
  publicOnlyMiddleware,
} from "../middlewares";

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

rootRouter.route("/home-search").all(protectorMiddleware).get(home_search);
rootRouter
  .route("/outbound-search")
  .all(protectorMiddleware)
  .get(outbound_search);

rootRouter.route("/dailyReport").all(protectorMiddleware).get(getDailyReport);

export default rootRouter;
