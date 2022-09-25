import express from 'express';
import { admBusCreate, admBusDelete, admBusInquiry, admBusUpdate, appBusInfo, appBusStop, appBusTime } from '../controllers/busInfoController';

const busInfoRouter = express.Router();

//App
busInfoRouter.post('/', appBusInfo);
busInfoRouter.post('/busstop', appBusStop);
busInfoRouter.post('/bustime', appBusTime);

//Web
busInfoRouter.route('/admin').post(admBusInquiry).patch(admBusUpdate).delete(admBusDelete);
busInfoRouter.post('/admin/create', admBusCreate);

export default busInfoRouter;