import express from 'express';
import {  commentCreate, commentDelete, commentInquiry } from '../controllers/commentController';

const commentRouter = express.Router();

//App
commentRouter.get('/', commentInquiry);
commentRouter.post('/create', commentCreate);
commentRouter.post('/delete', commentDelete);

export default commentRouter;