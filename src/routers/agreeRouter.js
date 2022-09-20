import express from 'express';
import { stdAgree, stdDelete, stdInquiry } from '../controllers/agreeController';

const agreeRouter = express.Router();

//Web
agreeRouter.route('/').post(stdInquiry).patch(stdAgree).delete(stdDelete);

export default agreeRouter;