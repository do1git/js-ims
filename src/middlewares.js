import multer from "multer";
import path from "path";
import fs from "fs-extra";

export const uploadFiles = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dirPath = `uploads/${req.params.id}/`;
      fs.mkdirsSync(dirPath);
      cb(null, dirPath);
    },
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});
