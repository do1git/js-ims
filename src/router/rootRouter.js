import express from "express";
import {
  getDoneList,
  home,
  getManage,
  postManage,
} from "../controller/planController";
import {
  getEtc,
  getLogin,
  logout,
  postLogin,
} from "../controller/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route("/").all(protectorMiddleware).get(home);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.route("/done").all(protectorMiddleware).get(getDoneList);
rootRouter.route("/manage").all(protectorMiddleware).get(getManage);
rootRouter.route("/etc").all(protectorMiddleware).get(getEtc);
// rootRouter.get("/logout", logout);

export default rootRouter;
