import express from 'express';
import { appCreate, appDelete, appInquiry } from '../controllers/commentController';

const commentRouter = express.Router();

//App
commentRouter.post('/', appInquiry);
commentRouter.post('/create', appCreate);
commentRouter.delete('/delete', appDelete);

export default commentRouter;