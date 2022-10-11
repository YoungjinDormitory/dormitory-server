import express from 'express';
import { stdAgree, stdDelete, stdInquiry } from '../controllers/agreeController';

const agreeRouter = express.Router();

//Web
agreeRouter.route('/').post(stdInquiry).post(stdAgree).post(stdDelete);

export default agreeRouter;