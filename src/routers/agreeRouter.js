import express from "express";
import { stdAgree, stdDelete, stdInquiry, stdAgreePageNum, stdAgreeInquiry, stdPageNum } from "../controllers/agreeController";

const agreeRouter = express.Router();

//Web
agreeRouter.get("/pagenum", stdAgreePageNum);
agreeRouter.post("/", stdAgreeInquiry);
// agreeRouter.post(stdAgree).post(stdDelete);
agreeRouter.post("/grant", stdAgree);
agreeRouter.get("/user", stdPageNum);
agreeRouter.post("/user", stdInquiry);
agreeRouter.post("/delete", stdDelete);

export default agreeRouter;
