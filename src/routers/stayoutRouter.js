import express from 'express';
import { admStayoutDate, admStayoutInquiry, admStayoutPageNum, stayoutCreate, stayoutDelete, stayoutInquiry, stayoutSearch, stayoutUpdate } from '../controllers/stayoutController';

const stayoutRouter = express.Router();

//App
stayoutRouter.get('/', stayoutInquiry);
stayoutRouter.get('/update', stayoutUpdate);
stayoutRouter.post('/search', stayoutSearch);
stayoutRouter.post('/create', stayoutCreate);
stayoutRouter.post('/delete', stayoutDelete);

//Web
stayoutRouter.get('/admin', admStayoutInquiry);
stayoutRouter.post('/admin/pagenum', admStayoutPageNum);
stayoutRouter.post('/admin/people/date', admStayoutDate);

export default stayoutRouter;