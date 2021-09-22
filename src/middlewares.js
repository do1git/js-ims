import multer from "multer";
import path from "path";
import fs from "fs-extra";
import Event from "./models/Event";

export const uploadFiles = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dirPath = `uploads/pumps/${req.params.id}/`;
      fs.mkdirsSync(dirPath);
      cb(null, dirPath); // 경로 추가함 pump 폴더내부로
    },
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

export const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dirPath = `uploads/userAvatars/`;
      cb(null, dirPath);
    },
    filename: (req, file, cb) => {
      console.log(req);
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  next();
};

export const protectorMiddleware = async (req, res, next) => {
  if (req.session.loggedIn) {
    console.log("🧑‍🚒protector runs");

    const userId = req.session.user._id;
    const events = await Event.find({
      status: "wait",
      toTarget: userId,
      type: "userInfo-modified",
    });

    if (events.length > 0) {
      req.session.loggedIn = false;
      events.forEach(async (e) => {
        console.log("MAKE LOGGED OUT A USER", req.session.loggedIn);
        e.status = "done";
        await e.save();
      });
      req.flash("error", "정보수정으로 인해 다시 로그인 해주세요");
      return res.redirect("/login");
    } else {
      console.log("not working");
      return next();
    }
  } else {
    req.flash("error", "로그인을 해주세요");
    return res.redirect("/login");
  }
};
// const eventChecker = async (req) => {
//   const userId = req.session.user._id;
//   let checker = false;
//   const events = await Event.find({
//     status: "wait",
//     toTarget: userId,
//     type: "userInfo-modified",
//   });

//   events.forEach(async (e) => {
//     req.session.loggedIn = false;
//     console.log("MAKE LOGGED OUT A USER", req.session.loggedIn);
//     e.status = "done";
//     checker = true;
//     await e.save();
//   });

//   if (checker) {
//     return true;
//   } else {
//     return false;
//   }
// };
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    console.log("🌊Go to public");
    next();
  } else {
    req.flash("error", "로그인이 되어있습니다");
    return res.redirect("/");
  }
};

export const protectorMiddleware_plan = async (req, res, next) => {
  if (req.session.user.permission_plan) {
    console.log("🧑‍🚒protector PLAN runs");
    next();
  } else {
    req.flash("error", "생산/출고계획 접근권한을 확인하세요");
    return res.redirect("/");
  }
};

export const jsDateToKdate = (d) => {
  const year = d.getFullYear();
  const month =
    d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  const day = d.getDay();
  let kday;
  switch (day) {
    case 0:
      kday = "월";
    case 1:
      kday = "화";
    case 2:
      kday = "수";
    case 3:
      kday = "목";
    case 4:
      kday = "금";
    case 5:
      kday = "토";
    case 6:
      kday = "일";
  }
  return `${year}.${month}.${date}.${kday}`;
};

export const jsDayToKday = (d) => {
  const day = d.getDay();
  let kday;
  switch (day) {
    case 0:
      kday = "월";
    case 1:
      kday = "화";
    case 2:
      kday = "수";
    case 3:
      kday = "목";
    case 4:
      kday = "금";
    case 5:
      kday = "토";
    case 6:
      kday = "일";
  }
  return kday;
};

export const jsYYYYMMDD = (d) => {
  if (d === null) {
    return null;
  }
  const yyyy = d.getFullYear();
  const mm = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  const dd = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  return `${yyyy}-${mm}-${dd}`;
};
