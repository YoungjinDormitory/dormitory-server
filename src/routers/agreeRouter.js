import express from 'express';
import { stdAgree, stdDelete, stdInquiry } from '../controllers/agreeController';

const agreeRouter = express.Router();

//Web
agreeRouter.route('/').get(stdInquiry).post(stdAgree).post(stdDelete);

export default agreeRouter;