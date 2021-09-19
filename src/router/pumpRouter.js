import express from "express";
import {
  getPumpDelete,
  getPumpEdit,
  getPumpRegister,
  getPumpView,
  postPumpDelete,
  postPumpEdit,
  postPumpRegister,
  pumpList,
} from "../controller/pumpController";
import { protectorMiddleware } from "../middlewares";
const pumpRouter = express.Router();

pumpRouter
  .route("/:id([0-9a-f]{24})")
  .all(protectorMiddleware)
  .get(getPumpView);
pumpRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getPumpEdit)
  .post(postPumpEdit);
pumpRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(getPumpDelete);
pumpRouter
  .route("/register")
  .all(protectorMiddleware)
  .get(getPumpRegister)
  .post(postPumpRegister);

export default pumpRouter;
