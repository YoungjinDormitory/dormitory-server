import express from 'express';
import { admBusHome, admBusInquiry, admBusPageNum, busCreate, busDelete, busInquiry, busSearch, busUpdate } from '../controllers/busController';

const busRouter = express.Router();

//App BusRouter
busRouter.get('/', busInquiry);
busRouter.post('/search', busSearch);
busRouter.post('/create', busCreate);
busRouter.patch('/update', busUpdate);
busRouter.post('/delete', busDelete);

//Web BusRouter
busRouter.post('/admin', admBusHome);
busRouter.post('/admin/pagenum', admBusPageNum);
busRouter.post('/admin/inquiry', admBusInquiry);

export default busRouter;