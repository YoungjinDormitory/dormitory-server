import express from 'express';
import {  commentCreate, commentDelete, commentInquiry, commentUpdate } from '../controllers/commentController';

const commentRouter = express.Router();

//App
commentRouter.get('/', commentInquiry);
commentRouter.post('/create', commentCreate);
commentRouter.post('/update', commentUpdate);
commentRouter.post('/delete', commentDelete);

export default commentRouter;