import express from 'express';
import { holidayCreate, holidayDelete, holidayInquiry } from '../controllers/holidayController';

const holidayRouter = express.Router();

//Web
holidayRouter.route('/').get(holidayInquiry).post(holidayDelete);
holidayRouter.post('/create', holidayCreate);

export default holidayRouter;