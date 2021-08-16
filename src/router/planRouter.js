import express from "express";
import {
  getDoneRegister,
  getPlanEdit,
  getPlanRegister,
  getPlanView,
  postDoneRegister,
  postDoneRegister2,
  postPlanRegister,
} from "../controller/planController";
import { uploadFiles } from "../middlewares";

const planRouter = express.Router();

planRouter
  .route("/:id([0-9a-f]{24})/register")
  .get(getPlanRegister)
  .post(postPlanRegister);
planRouter.route("/:id([0-9a-f]{24})").get(getPlanView);
planRouter
  .route("/:id([0-9a-f]{24})/done")
  .get(getDoneRegister)
  .post(uploadFiles.array("photos", 10), postDoneRegister);
planRouter.route("/:id([0-9a-f]{24})/done2").post(postDoneRegister2);
planRouter.route("/:id([0-9a-f]{24})/edit").get(getPlanEdit);

export default planRouter;
