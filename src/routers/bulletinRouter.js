import express from 'express';
import { deserializeUser } from 'passport';
import {  bulletinClickHot, bulletinCreate, bulletinDelete, bulletinImgInquiry, bulletinInquiry, bulletinInquiryView, bulletinSearch, bulletinUpdate } from '../controllers/bulletinController';

const bulletinRouter = express.Router();

bulletinRouter.get('/', bulletinInquiry);
bulletinRouter.post('/search', bulletinSearch);

//App
bulletinRouter.use(deserializeUser)
bulletinRouter.get('/image', bulletinImgInquiry);
bulletinRouter.get('/watch', bulletinInquiryView);
bulletinRouter.post('/update', bulletinUpdate);
bulletinRouter.post('/create', bulletinCreate);
bulletinRouter.post('/clickhot', bulletinClickHot);
bulletinRouter.post('/delete', bulletinDelete);



export default bulletinRouter;