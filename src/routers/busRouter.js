import express from 'express';
import { admBusHome, admInquiry, admPageNum, busDelete, busInquiry, busReservations, busRevision, busSearch } from '../controllers/busController';

const busRouter = express.Router();

//App BusRouter
busRouter.post('/', busInquiry);
busRouter.post('/search', busSearch);
busRouter.post('/create', busReservations);
busRouter.patch('/update', busRevision);
busRouter.delete('/delete', busDelete);

//Web BusRouter
busRouter.post('/admin', admBusHome);
busRouter.post('/admin/pagenum', admPageNum);
busRouter.post('/admin/inquiry', admInquiry);

export default busRouter;