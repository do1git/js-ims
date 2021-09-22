import User from "../models/User";
import Event from "../models/Event";
import bcrypt from "bcrypt";
import session from "express-session";

export const getEtc = async (req, res) => {
  console.log(req.session.user);
  res.render("etc", { header: "목록" });
};
export const getUserView = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res
      .status(404)
      .render("404", { errorMessage: "해당 유저가 없습니다" });
  }
  return res.render("userViews/userView", {
    user,
    header: `${user.name}님의 프로필`,
  });
};

export const getUserList = async (req, res) => {
  const users = await User.find({});
  if (!users) {
    users = [];
  }
  res.render("./userViews/userList", { users, header: "우리회사 식구들" });
};

export const getCreateUser = async (req, res) => {
  res.render("./userViews/userCreate", { header: "새 직원을 추가하세요" });
};

export const postCreateUser = async (req, res) => {
  let avatar;
  if (!req.file) {
    avatar = null;
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
    req.flash("success", `${name3}님의 계정이 생성되었습니다`);
    res.redirect("/users");
  } catch (error) {
    if (error.code === 11000) {
      return res.render("404", {
        errorMessage: "사용자 사이의 중복된 정보가 있습니다",
      });
    }
    console.log(error);
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
      .render("login", { errorMessage: "ID / PW 를 확인하세요" });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res
      .status(400)
      .render("login", { errorMessage: "ID / PW 를 확인하세요" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  req.flash("success", `${user.name}님 안녕하세요`);
  res.redirect("/");
};

export const getLogout = (req, res) => {
  const logoutUser = req.session.user.name;
  req.session.loggedIn = false;
  req.flash("success", `${logoutUser}님의 로그아웃이 완료되었습니다`);
  return res.redirect("/login");
};

export const getUserEditInfo = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("userViews/userEditInfo", {
    user,
    header: `${user.name}님에 대한 수정`,
  });
};

export const postUserEditInfo = async (req, res) => {
  const { id } = req.params;
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
  let search = {
    name: name3,
    grade: grade,
    department: department,
    mobile: mobile,
    permission_plan: permission_plan,
    permission_user: permission_user,

    birthDay: birthDay,
    email: email,
  };
  if (req.file) {
    const avatar = req.file.path;
    search.avatar = avatar;
  }

  try {
    await User.findByIdAndUpdate(id, search);
    await Event.create({
      status: "wait",
      type: "userInfo-modified",
      byWhom: req.session.user._id,
      toTarget: id,
      createdAt: Date.now(),
    });
    req.flash("success", `${name3}님의 정보수정이 완료되었습니다`);
    res.redirect(`/users/${id}`);
  } catch (error) {
    res.render("404", { errorMessage: error });
  }
};

export const getUserQuit = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("check", { header: `${user.name}님의 퇴사처리` });
};

export const postUserQuit = async (req, res) => {
  const { id } = req.params;
  const {
    session: {
      user: { _id, password },
    },
    body: { check },
  } = req;
  const user = await User.findById(id);
  const userName = user.name;
  const ok = await bcrypt.compare(check, password);
  if (!ok) {
    return res.status(400).render("check", {
      errorMessage: "비밀번호를 확인하세요",
      header: `${user.name}님의 퇴사처리`,
    });
  } else {
    await User.findByIdAndRemove(id);
    req.flash("success", `${userName}님의 퇴사처리가 완료되었습니다`);
    res.redirect("/users");
  }
};
