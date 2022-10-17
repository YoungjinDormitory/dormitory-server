import express from "express";
import { stdAgree, stdDelete, stdAgreeInquiry, stdInquiry } from "../controllers/agreeController";

const agreeRouter = express.Router();

//Web
agreeRouter.get("/", stdAgreeInquiry);
// agreeRouter.post(stdAgree).post(stdDelete);
agreeRouter.post("/grant", stdAgree);
agreeRouter.get("/user", stdInquiry);
agreeRouter.post("/delete", stdDelete);

export default agreeRouter;
