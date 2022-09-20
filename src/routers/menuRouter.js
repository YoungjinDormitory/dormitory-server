import express from 'express';
import { appMenu, MenuCreate, MenuDelete, menuExist, menuInquiry, menuPageNum, menuUpdate } from '../controllers/menuController';

const menuRouter = express.Router();

//App
menuRouter.post('/app', appMenu);
menuRouter.post('/exist', menuExist);

//Web
menuRouter.route('/').post(menuInquiry).patch(menuUpdate).delete(MenuDelete);
menuRouter.post('/pagenum', menuPageNum);
menuRouter.post('/create', MenuCreate);

export default menuRouter;