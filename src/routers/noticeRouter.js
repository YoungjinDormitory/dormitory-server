import express from "express";
import { getNotice, getNoticeDetail, noticeCreate, noticeInquiryView, noticeDelete, noticeModify } from "../controllers/noticeController";
const noticeRouter = express.Router();

noticeRouter.post("/", getNotice);
noticeRouter.post("/detail", getNoticeDetail);
noticeRouter.post("/view", noticeInquiryView);
noticeRouter.post("/create", noticeCreate);
noticeRouter.post("/delete", noticeDelete);
noticeRouter.post("/modify", noticeModify);

export default noticeRouter;
