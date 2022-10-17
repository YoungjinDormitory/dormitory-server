import express from "express";
import { admAsChecked, admAsInquiry, admAsPageNum, admaAllAsInquiry, asCreate, asDelete, asInquiry, asSearch, asUpdate } from "../controllers/asController";

const asRouter = express.Router();

//App
asRouter.get("/", asInquiry);
asRouter.get("/update", asUpdate);
asRouter.post("/create", asCreate);
asRouter.post("/delete", asDelete);

//Web
asRouter.get("/admin", admaAllAsInquiry);
asRouter.post("/admin/inquiry", admAsInquiry);
asRouter.post("/admin/checked", admAsChecked);
asRouter.post("/admin/pagenum", admAsPageNum);

export default asRouter;
