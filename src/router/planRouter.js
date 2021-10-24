import express from "express";
import {
  getDoneRegister,
  getOutbound,
  getPlanDelete,
  getPlanEdit,
  getPlanEditPic,
  getPlanRegister,
  getPlanView,
  postDoneRegister,
  postDoneRegister2,
  postOutbound,
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
  .all(protectorMiddleware, protectorMiddleware_plan)
  .get(getPlanRegister)
  .post(postPlanRegister);
planRouter
  .route("/:id([0-9a-f]{24})")
  .all(protectorMiddleware)
  .get(getPlanView);
planRouter
  .route("/:id([0-9a-f]{24})/editPic")
  .all(protectorMiddleware)
  .get(getPlanEditPic);
planRouter
  .route("/:id([0-9a-f]{24})/done")
  .all(protectorMiddleware)
  .get(getDoneRegister)
  .post(uploadFiles.array("photos", 10), postDoneRegister);
// planRouter
//   .route("/:id([0-9a-f]{24})/done2")
//   .all(protectorMiddleware)
//   .post(postDoneRegister2);
planRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getPlanEdit)
  .post(postPlanEdit);
planRouter
  .route("/:id([0-9a-f]{24})/outbound")
  .all(protectorMiddleware)
  .get(getOutbound)
  .post(postOutbound);
planRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(getPlanDelete)
  .post(postPlanDelete);

export default planRouter;
