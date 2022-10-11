import express from 'express';
import { admAsChecked, admAsInquiry, admAsPageNum, asCreate, asDelete, asInquiry, asSearch, asUpdate } from '../controllers/asController';

const asRouter = express.Router();

//App
asRouter.get('/', asInquiry);
asRouter.get('/update', asUpdate);
asRouter.post('/search', asSearch);
asRouter.post('/create', asCreate);
asRouter.post('/delete', asDelete);

//Web
asRouter.post('/admin/inquiry', admAsInquiry);
asRouter.patch('/admin/checked', admAsChecked);
asRouter.post('/admin/pagenum', admAsPageNum);

export default asRouter;