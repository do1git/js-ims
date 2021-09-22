import express from "express";
import {
  getDoneRegister,
  getPlanDelete,
  getPlanEdit,
  getPlanRegister,
  getPlanView,
  postDoneRegister,
  postDoneRegister2,
  postPlanDelete,
  postPlanEdit,
  postPlanRegister,
} from "../controller/planController";
import {
  protectorMiddleware,
  protectorMiddleware_plan,
  uploadFiles,
} from "../middlewares";

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
  .all(protectorMiddleware, protectorMiddleware_plan)
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
planRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(getPlanDelete)
  .post(postPlanDelete);
export default planRouter;
