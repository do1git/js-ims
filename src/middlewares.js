import multer from "multer";
import path from "path";
import fs from "fs-extra";

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

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};
export const jsDateToKdate = (d) => {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
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
  return `${year}-${month}-${date}-${kday}`;
};
