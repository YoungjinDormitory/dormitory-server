import express from 'express';
import {  bulletinClickHot, bulletinCreate, bulletinDelete, bulletinImgInquiry, bulletinInquiry, bulletinInquiryView, bulletinSearch, bulletinUpdate } from '../controllers/bulletinController';

const bulletinRouter = express.Router();

//App
bulletinRouter.post('/', bulletinInquiry);
bulletinRouter.post('/image', bulletinImgInquiry);
bulletinRouter.post('/create', bulletinCreate);
bulletinRouter.post('/update', bulletinUpdate);
bulletinRouter.post('/search', bulletinSearch);
bulletinRouter.post('/clickhot', bulletinClickHot);
bulletinRouter.post('/watch', bulletinInquiryView);
bulletinRouter.post('/delete', bulletinDelete);

export default bulletinRouter;