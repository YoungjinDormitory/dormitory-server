import express from 'express';
import { appInquire } from '../controllers/hotController';

const hotRouter = express.Router();

hotRouter.post('/', appInquire);

export default hotRouter;