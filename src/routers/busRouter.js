import express from 'express';
import { adminBusHome, adminInquiry, adminPageNum, appDelete, appInquiry, appReservations, appRevision, appSearch } from '../controllers/busController';

const busRouter = express.Router();

//App BusRouter
busRouter.post('/', appInquiry);
busRouter.post('/search', appSearch);
busRouter.post('/create', appReservations);
busRouter.patch('/update', appRevision);
busRouter.delete('/delete', appDelete);

//Web BusRouter
busRouter.post('/admin', adminBusHome);
busRouter.post('/admin/pagenum', adminPageNum);
busRouter.post('/admin/inquiry', adminInquiry);

export default busRouter;