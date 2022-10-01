import express from 'express';
import { admMenuCreate, admMenuDelete, admMenuInquiry, admMenuPageNum, admMenuUpdate, menu, menuExist } from '../controllers/menuController';

const menuRouter = express.Router();

//App
menuRouter.post('/app', menu);
menuRouter.post('/exist', menuExist);

//Web
menuRouter.route('/').get(admMenuInquiry).get(admMenuUpdate).post(admMenuDelete);
menuRouter.post('/pagenum', admMenuPageNum);
menuRouter.post('/create', admMenuCreate);

export default menuRouter;