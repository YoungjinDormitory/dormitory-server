import express from 'express';
import { deserializeUser } from 'passport';
import {  bulletinClickHot, bulletinCreate, bulletinDelete, bulletinImgInquiry, bulletinInquiry, bulletinInquiryView, bulletinSearch, bulletinUpdate } from '../controllers/bulletinController';

const bulletinRouter = express.Router();

bulletinRouter.get('/', bulletinInquiry);
bulletinRouter.get('/search', bulletinSearch);

//App
bulletinRouter.use(deserializeUser)
bulletinRouter.get('/detail', bulletinDetail);
bulletinRouter.get('/image', bulletinImgInquiry);
bulletinRouter.get('/search/count', bulletinSearchCount);
bulletinRouter.get('/count', bulletinCount);

bulletinRouter.post('/view', bulletinInquiryView);
bulletinRouter.post('/create', upload.array('images'), bulletinCreate);
bulletinRouter.post('/update', upload.array('images'), bulletinUpdate);
bulletinRouter.post('/hot', bulletinClickHot);
bulletinRouter.post('/delete', bulletinDelete);

export default bulletinRouter;