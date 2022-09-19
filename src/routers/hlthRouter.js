import express from 'express';
import { adminInquiry, adminPageNum, appCreate, appDelete, appInquiry, appSearch } from '../controllers/hlthController';

const hlthRouter = express.Router();

//App
hlthRouter.post('/', appInquiry);
hlthRouter.post('/search', appSearch);
hlthRouter.post('/create', appCreate);
hlthRouter.delete('/delete', appDelete);

//Web
hlthRouter.post('/admin', adminInquiry);
hlthRouter.post('/admin/pagenum', adminPageNum);

export default hlthRouter;