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

app.use(logger);

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