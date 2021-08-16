import User from "../models/User";
import bcrypt from "bcrypt";
import session from "express-session";

export const getEtc = (req, res) => {
  res.render("etc");
};
export const getUserView = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res
      .status(404)
      .render("404", { errorMessage: "해당 유저가 없습니다" });
  }
  return res.render("userViews/userView", { user });
};

export const getUserList = async (req, res) => {
  const users = await User.find({});
  if (!users) {
    users = [];
  }
  res.render("./userViews/userList", { users });
};
export const getCreateUser = async (req, res) => {
  res.render("./userViews/userCreate");
};

export const postCreateUser = async (req, res) => {
  let avatar;
  if (!req.file) {
    avatar = "/static/statics/defaultProfile.jpeg";
  } else {
    avatar = req.file.path;
  }
  const password = "1111a";
  const {
    name3,
    grade,
    department,
    email,
    mobile,
    permission_plan,
    permission_user,
    birthDay,
  } = req.body;
  try {
    await User.create({
      name: name3,
      grade,
      department,
      email,
      mobile,
      permission_plan,
      permission_user,
      avatar,
      password,
      birthDay,
    });
    res.redirect("/users");
  } catch (error) {
    res.render("404", { errorMessage: error });
  }
};

export const getLogin = (req, res) => {
  res.render("login");
};

export const postLogin = async (req, res) => {
  const { mobile, password } = req.body;
  const user = await User.findOne({ mobile });
  if (!user) {
    return res
      .render(400)
      .render("login", { errorMessage: "사용자가 존재하지않음" });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.render(400).render("login", { errorMessage: "비밀번호 틀림" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/login");
};
