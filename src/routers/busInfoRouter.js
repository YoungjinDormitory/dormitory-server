import express from 'express';
import { adminBusCreate, adminBusDelete, adminBusUpdate, adminInquiry, appBusInfo, appBusStop, appBusTime } from '../controllers/busInfoController';

const busInfoRouter = express.Router();

//App
busInfoRouter.post('/', appBusInfo);
busInfoRouter.post('/busstop', appBusStop);
busInfoRouter.post('/bustime', appBusTime);

//Web
busInfoRouter.route('/admin').post(adminInquiry).patch(adminBusUpdate).delete(adminBusDelete);
busInfoRouter.post('/admin/create', adminBusCreate);

export default busInfoRouter;