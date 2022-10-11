import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_PATH = "src/public/images";

fs.readdir(UPLOAD_PATH, (error) => {
  if (error) {
    fs.mkdirSync(UPLOAD_PATH);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
