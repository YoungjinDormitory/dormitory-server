import express from 'express';
import { admHlthInquiry, admHlthPageNum, hlthCreate, hlthDelete, hlthInquiry, hlthSearch } from '../controllers/hlthController';

const hlthRouter = express.Router();

//App
hlthRouter.get('/', hlthInquiry);
hlthRouter.post('/search', hlthSearch);
hlthRouter.post('/create', hlthCreate);
hlthRouter.post('/delete', hlthDelete);

//Web
hlthRouter.get('/admin', admHlthInquiry);
hlthRouter.post('/admin/pagenum', admHlthPageNum);

export default hlthRouter;