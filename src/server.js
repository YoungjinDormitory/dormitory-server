import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import path from 'path';
import {sequelize} from './models';
import { Sequelize } from 'sequelize';
import rootRouter from './routers/rootRouter';
import busInfoRouter from './routers/busInfoRouter';
import asRouter from './routers/asRouter';
import hlthRouter from './routers/hlthRouter';
import stayoutRouter from './routers/stayoutRouter';
import hotRouter from './routers/hotRouter';
import bulletinRouter from './routers/bulletinRouter';
import commentRouter from './routers/commentRouter';
import menuRouter from './routers/menuRouter';
import jwt from 'jsonwebtoken';
import { localsMiddleware } from './middlewares';

const app = express();
const logger = morgan('dev');

app.set('port', process.env.PORT || 3001);
sequelize.sync({force: false}).then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.error(err);
});

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new Sequelize({
            db: sequelize,
        }),
    })
);
//post /login 요청
// app.post('/login/user ', (req, res, next) => {
//     const key = process.env.SECRET_KEY; //로그인 정보
//     const nickname = 'hello';
//     const profile = 'images';
//     let token = '';
//     token = jwt.sign(
//         {
//             type: 'JWT',
//             nickname,
//             profile,
//         },
//         key,
//         {
//             expiresIn: '20m', //20분후 만료
//             issuer: '토큰 발급',
//         }
//     );

//     return res.status(200).json({
//         code: 200,
//         message: 'token is Created',
//         token,
//     });
// });

app.use(logger);

app.use(localsMiddleware);
app.use('/', rootRouter);
app.use('/bus', busRouter);
app.use('/businfo', busInfoRouter);
app.use('/as', asRouter);
app.use('/hlth', hlthRouter);
app.use('/stayout', stayoutRouter);
app.use('/hot', hotRouter);
app.use('/bulletin', bulletinRouter);
app.use('/comment', commentRouter);
app.use('/menu', menuRouter);


export default app;