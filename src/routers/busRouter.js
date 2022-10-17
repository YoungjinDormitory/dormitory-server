import express from "express";
import {
  admBusHome,
  admBusInquiry,
  admBusPageNum,
  admAllBusInquiry,
  busDelete,
  busInquiry,
  busReservations,
  busRevision,
  busSearch,
} from "../controllers/busController";

const busRouter = express.Router();

//App BusRouter
busRouter.get("/", busInquiry);
busRouter.post("/search", busSearch);
busRouter.post("/create", busReservations);
busRouter.post("/update", busRevision);
busRouter.post("/delete", busDelete);

//Web BusRouter
busRouter.post("/admin", admBusHome);
busRouter.post("/admin/pagenum", admBusPageNum);
busRouter.post("/admin/inquiry", admBusInquiry);
// busRouter.get("/admin", admAllBusInquiry);

export default busRouter;
