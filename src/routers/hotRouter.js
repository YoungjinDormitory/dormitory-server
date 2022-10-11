import express from 'express';
import { hotCount, hotInquire } from '../controllers/hotController';

const hotRouter = express.Router();

hotRouter.get('/', hotInquire);
hotRouter.get('/count', hotCount);

export default hotRouter;