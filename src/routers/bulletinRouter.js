import express from 'express';
import { appClickHot, appCreate, appDelete, appImageInquiry, appInquiry, appInquiryView, appSearch, appUpdate } from '../controllers/bulletinController';

const bulletinRouter = express.Router();

//App
bulletinRouter.post('/', appInquiry);
bulletinRouter.post('/image', appImageInquiry);
bulletinRouter.post('/create', appCreate);
bulletinRouter.post('/update', appUpdate);
bulletinRouter.post('/search', appSearch);
bulletinRouter.post('/clickhot', appClickHot);
bulletinRouter.post('/watch', appInquiryView);
bulletinRouter.post('/delete', appDelete);

export default bulletinRouter;