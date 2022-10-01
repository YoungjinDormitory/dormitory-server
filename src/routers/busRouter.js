import express from 'express';
import { admBusHome, admBusInquiry, admBusPageNum, admInquiry, admPageNum, busCreate, busDelete, busInquiry, busSearch, busUpdate } from '../controllers/busController';

const busRouter = express.Router();

//App BusRouter
busRouter.get('/', busInquiry);
busRouter.post('/search', busSearch);
busRouter.post('/create', busCreate);
busRouter.post('/update', busUpdate);
busRouter.post('/delete', busDelete);

//Web BusRouter
busRouter.get('/admin', admBusHome);
busRouter.get('/admin/inquiry', admBusInquiry);
busRouter.post('/admin/pagenum', admBusPageNum);

export default busRouter;