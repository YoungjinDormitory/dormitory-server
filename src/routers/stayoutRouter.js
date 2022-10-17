import express from "express";
import {
  admAllStayoutInquiry,
  admStayoutDate,
  admStayoutInquiry,
  admStayoutPageNum,
  stayoutCreate,
  stayoutDelete,
  stayoutInquiry,
  stayoutSearch,
  stayoutUpdate,
} from "../controllers/stayoutController";

const stayoutRouter = express.Router();

//App
stayoutRouter.get("/", stayoutInquiry);
stayoutRouter.post("/create", stayoutCreate);
stayoutRouter.post("/update", stayoutUpdate);
stayoutRouter.post("/delete", stayoutDelete);

//Web
stayoutRouter.post("/admin", admStayoutInquiry);
stayoutRouter.post("/admin/pagenum", admStayoutPageNum);
stayoutRouter.post("/admin/people/date", admStayoutDate);
stayoutRouter.get("/admin", admAllStayoutInquiry);

export default stayoutRouter;
