import express from 'express';
import { adminLogin, changePw, findPw, login, logout, signUp } from '../controllers/rootController';

const rootRouter = express.Router();

//App
rootRouter.post('/signup', signUp);
rootRouter.post('/login', login);
rootRouter.post('/logout', logout);
rootRouter.post('/find/pw', findPw);
rootRouter.post('/change/pw', changePw);

//Web 
rootRouter.post('/admin/login', adminLogin);


export default rootRouter;