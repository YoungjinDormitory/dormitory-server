import express from 'express';
import { adminChecked, adminInquiry, adminPageNum, appCreate, appDelete, appInquiry, appSearch, appUpdate } from '../controllers/asController';

const asRouter = express.Router();

//App
asRouter.post('/', appInquiry);
asRouter.post('/search', appSearch);
asRouter.post('/create', appCreate);
asRouter.patch('/update', appUpdate);
asRouter.delete('/delete', appDelete);

//Web
asRouter.post('/admin/inquiry', adminInquiry);
asRouter.patch('/admin/checked', adminChecked);
asRouter.post('/admin/pagenum', adminPageNum);

export default asRouter;