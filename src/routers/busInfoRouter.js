import express from "express";
import { admBusCreate, admBusDelete, admBusInquiry, admBusPagenum, admBusUpdate, busInfo, busStop, busTime } from "../controllers/busInfoController";

const busInfoRouter = express.Router();

//App
busInfoRouter.get("/", busInfo);
busInfoRouter.post("/busstop", busStop);
busInfoRouter.post("/bustime", busTime);

//Web
busInfoRouter.post("/admin", admBusPagenum);
busInfoRouter.post("/admin/inquiry", admBusInquiry);
busInfoRouter.post("/admin/update", admBusUpdate);
busInfoRouter.post("/admin/delete", admBusDelete);
busInfoRouter.post("/admin/create", admBusCreate);

export default busInfoRouter;
