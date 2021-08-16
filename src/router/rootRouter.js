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

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/done").get(getDoneList);
rootRouter.route("/manage").get(getManage);
rootRouter.get("/etc", getEtc);
rootRouter.get("/logout", logout);

export default rootRouter;
