import express from "express";
import {
  getBand,
  getPumpDelete,
  getPumpEdit,
  getPumpRegister,
  getPumpRegisterFromBand,
  getPumpView,
  postPumpDelete,
  postPumpEdit,
  postPumpRegister,
} from "../controller/pumpController";
import { protectorMiddleware, protectorMiddleware_plan } from "../middlewares";
import app from "../server";
import sparepartRouter from "./sparepartsRouter";
const pumpRouter = express.Router();

pumpRouter
  .route("/:id([0-9a-f]{24})")
  .all(protectorMiddleware)
  .get(getPumpView);
pumpRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware, protectorMiddleware_plan)
  .get(getPumpEdit)
  .post(postPumpEdit);
// pumpRouter if you needed, you can activate
//   .route("/:id([0-9a-f]{24})/delete")
//   .all(protectorMiddleware)
//   .get(getPumpDelete)
//   .post(postPumpDelete);
pumpRouter
  .route("/register")
  .all(protectorMiddleware, protectorMiddleware_plan)
  .get(getPumpRegister)
  .post(postPumpRegister);

pumpRouter.route("/band").all(protectorMiddleware).get(getBand);

pumpRouter.use("/sparepart", sparepartRouter);

export default pumpRouter;
