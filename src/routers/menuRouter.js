import express from "express";
import { admMenuCreate, admMenuDelete, admMenuInquiry, admMenuPageNum, admMenuUpdate, menu, menuExist } from "../controllers/menuController";

const menuRouter = express.Router();

//App
menuRouter.post("/app", menu);
menuRouter.post("/exist", menuExist);

//Web
menuRouter.post("/admin", admMenuInquiry);
menuRouter.post("/admin/update", admMenuUpdate);
menuRouter.post("/admin/delete", admMenuDelete);
menuRouter.post("/admin/pagenum", admMenuPageNum);
menuRouter.post("/admin/create", admMenuCreate);

export default menuRouter;
