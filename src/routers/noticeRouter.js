import express from "express";
import { getNotice, getNoticeDetail, noticeCreate, noticeInquiryView, noticeDelete, noticeModify, getNoticePageNum } from "../controllers/noticeController";
const noticeRouter = express.Router();

noticeRouter.get("/", getNotice);
noticeRouter.get("/count", getNoticePageNum);
noticeRouter.get("/detail", getNoticeDetail);
noticeRouter.post("/view", noticeInquiryView);
noticeRouter.post("/create", noticeCreate);
noticeRouter.post("/delete", noticeDelete);
noticeRouter.post("/modify", noticeModify);

export default noticeRouter;
