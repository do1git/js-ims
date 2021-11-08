import express from "express";
import {
  getSparepartRegister,
  getSparepartsView,
  postSparepartRegister,
} from "../controller/sparepartController";
import { uploadSparepart } from "../middlewares";

const sparepartRouter = express.Router();

sparepartRouter.route("/").get(getSparepartsView);
sparepartRouter
  .route("/register")
  .get(getSparepartRegister)
  .post(uploadSparepart.single("file"), postSparepartRegister);
sparepartRouter.route("/:id([0-9a-f]{24})");

export default sparepartRouter;
