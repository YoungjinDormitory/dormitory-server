import express from 'express';
import { deserializeUser } from 'passport';
import {  bulletinClickHot, bulletinCreate, bulletinDelete, bulletinImgInquiry, bulletinInquiry, bulletinInquiryView, bulletinSearch, bulletinUpdate } from '../controllers/bulletinController';

const bulletinRouter = express.Router();

bulletinRouter.get('/', bulletinInquiry);
bulletinRouter.post('/search', bulletinSearch);

//App
bulletinRouter.use(deserializeUser)
bulletinRouter.post('/image', bulletinImgInquiry);
bulletinRouter.post('/create', bulletinCreate);
bulletinRouter.post('/update', bulletinUpdate);
bulletinRouter.post('/clickhot', bulletinClickHot);
bulletinRouter.post('/watch', bulletinInquiryView);
bulletinRouter.post('/delete', bulletinDelete);



export default bulletinRouter;