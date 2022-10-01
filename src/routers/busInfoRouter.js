import express from 'express';
import { admBusCreate, admBusDelete, admBusInquiry, admBusUpdate, busInfo, busStop, busTime } from '../controllers/busInfoController';

const busInfoRouter = express.Router();

//App
busInfoRouter.get('/', busInfo);
busInfoRouter.get('/busstop', busStop);
busInfoRouter.post('/bustime', busTime);

//Web
busInfoRouter.route('/admin').get(admBusInquiry).post(admBusUpdate).post(admBusDelete);
busInfoRouter.post('/admin/create', admBusCreate);

export default busInfoRouter;