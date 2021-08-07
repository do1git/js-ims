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
const pumpRouter = express.Router();

pumpRouter.route("/:id([0-9a-f]{24})").get(getPumpView);
pumpRouter.route("/:id([0-9a-f]{24})/edit").get(getPumpEdit).post(postPumpEdit);
pumpRouter.route("/:id([0-9a-f]{24})/delete").get(getPumpDelete);
pumpRouter.route("/register").get(getPumpRegister).post(postPumpRegister);

export default pumpRouter;
