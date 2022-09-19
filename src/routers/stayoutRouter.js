import express from 'express';
import { adminInquiry, adminPageNum, adminPeopleDate, appCreate, appDelete, appInquiry, appSearch, appUpdate } from '../controllers/stayoutController';

const stayoutRouter = express.Router();

//App
stayoutRouter.post('/', appInquiry);
stayoutRouter.post('/search', appSearch);
stayoutRouter.post('/create', appCreate);
stayoutRouter.patch('/update', appUpdate);
stayoutRouter.delete('/delete', appDelete);

//Web
stayoutRouter.post('/admin', adminInquiry);
stayoutRouter.post('/admin/pagenum', adminPageNum);
stayoutRouter.post('/admin/people/date', adminPeopleDate);

export default stayoutRouter;