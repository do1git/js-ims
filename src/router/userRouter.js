import express from "express";
import {
  getCreateUser,
  getUserEditInfo,
  getUserList,
  getUserView,
  getUserQuit,
  postCreateUser,
  postUserEditInfo,
  postUserQuit,
  getLogout,
} from "../controller/userController";
import { protectorMiddleware, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/").all(protectorMiddleware).get(getUserList);
userRouter
  .route("/:id([0-9a-f]{24})")
  .all(protectorMiddleware)
  .get(getUserView);

userRouter
  .route("/:id([0-9a-f]{24})/infoEdit")
  .all(protectorMiddleware)
  .get(getUserEditInfo)
  .post(uploadAvatar.single("avatar"), postUserEditInfo);
userRouter
  .route("/:id([0-9a-f]{24})/pwEdit")
  .all(protectorMiddleware)
  .get(getUserView);
userRouter
  .route("/:id([0-9a-f]{24})/quit")
  .all(protectorMiddleware)
  .get(getUserQuit)
  .post(postUserQuit);

userRouter.route("/logout").all(protectorMiddleware).get(getLogout);

userRouter
  .route("/create")
  .all(protectorMiddleware)
  .get(getCreateUser)
  .post(uploadAvatar.single("avatar"), postCreateUser);

export default userRouter;
