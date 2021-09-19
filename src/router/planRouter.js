import express from "express";
import {
  getDoneRegister,
  getPlanEdit,
  getPlanRegister,
  getPlanView,
  postDoneRegister,
  postDoneRegister2,
  postPlanEdit,
  postPlanRegister,
} from "../controller/planController";
import { protectorMiddleware, uploadFiles } from "../middlewares";

const planRouter = express.Router();

planRouter
  .route("/:id([0-9a-f]{24})/register")
  .all(protectorMiddleware)
  .get(getPlanRegister)
  .post(postPlanRegister);
planRouter
  .route("/:id([0-9a-f]{24})")
  .all(protectorMiddleware)
  .get(getPlanView);
planRouter
  .route("/:id([0-9a-f]{24})/done")
  .all(protectorMiddleware)
  .get(getDoneRegister)
  .post(uploadFiles.array("photos", 10), postDoneRegister);
planRouter
  .route("/:id([0-9a-f]{24})/done2")
  .all(protectorMiddleware)
  .post(postDoneRegister2);
planRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getPlanEdit)
  .post(postPlanEdit);
export default planRouter;
