import express from "express";
import {
  getCreateUser,
  getUserList,
  getUserView,
  postCreateUser,
} from "../controller/userController";
import { uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/").get(getUserList);
userRouter.route("/:id([0-9a-f]{24})").get(getUserView);
userRouter
  .route("/create")
  .get(getCreateUser)
  .post(uploadAvatar.single("avatar"), postCreateUser);

export default userRouter;
