import express from 'express';
import morgan from 'morgan';
import path from 'path';
import db from './models';
import { Sequelize } from 'sequelize';
import {rootRouter, busInfoRouter, asRouter, hlthRouter, stayoutRouter, hotRouter, bulletinRouter, commentRouter, menuRouter } from './routers';
import jwt from 'jsonwebtoken';
import cors from 'cors';
// import { localsMiddleware } from './middlewares';

const app = express();
const logger = morgan('dev');

app.set('port', process.env.PORT || 3001);

db.sequelize.sync({force: false}).then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    
    console.error(err);
});


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
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: false}))
app.use(cors({origin:'http://localhost:5173', credentials: true}));
// app.use(localsMiddleware);


app.use('/', rootRouter);
// app.use('/bus', busRouter);
app.use('/businfo', busInfoRouter);
app.use('/as', asRouter);
app.use('/hlth', hlthRouter);
app.use('/stayout', stayoutRouter);
app.use('/hot', hotRouter);
app.use('/bulletin', bulletinRouter);
app.use('/comment', commentRouter);
app.use('/menu', menuRouter);



export default app;