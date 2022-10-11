import express from 'express';
import { adminInfo, adminLogin, adminRestoreAccessToken, changePw, findPw, login, logout, restoreAccessToken, sendMail, signUp, user } from '../controllers/rootController';

const rootRouter = express.Router();

//App
rootRouter.get('/restoreAccessToken', restoreAccessToken);
rootRouter.get('/adminRestoreAccessToken', adminRestoreAccessToken);
rootRouter.post('/signup', signUp);
rootRouter.post('/login', login);
rootRouter.post('/logout', logout);
rootRouter.post('/find/pw', findPw);
rootRouter.post('/change/pw', changePw);
rootRouter.post('/sendMail', sendMail);

//Web 
rootRouter.get('/user', user);
rootRouter.get('/admin/info', adminInfo);
rootRouter.post('/admin/login', adminLogin);

export default rootRouter;