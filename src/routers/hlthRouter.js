import express from "express";
import { admAllHlthInquiry, admHlthInquiry, admHlthPageNum, hlthCreate, hlthDelete, hlthInquiry, hlthSearch } from "../controllers/hlthController";

const hlthRouter = express.Router();

//App
hlthRouter.get("/", hlthInquiry);
hlthRouter.post("/search", hlthSearch);
hlthRouter.post("/create", hlthCreate);
hlthRouter.post("/delete", hlthDelete);

//Web
hlthRouter.post("/admin", admHlthInquiry);
hlthRouter.post("/admin/pagenum", admHlthPageNum);
hlthRouter.get("/admin", admAllHlthInquiry);

export default hlthRouter;
