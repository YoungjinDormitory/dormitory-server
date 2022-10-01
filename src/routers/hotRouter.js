import express from 'express';
import { hotInquire } from '../controllers/hotController';

const hotRouter = express.Router();

hotRouter.post('/', hotInquire);

export default hotRouter;