import express from "express";
import {
  getNotice,
  getNoticeDetail,
  noticeInquiryView,
} from "../controllers/noticeController";
const noticeRouter = express.Router();

noticeRouter.get("/", getNotice);
noticeRouter.get("/detail", getNoticeDetail);
noticeRouter.post("/view", noticeInquiryView);

export default noticeRouter;
