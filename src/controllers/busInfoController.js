import { Sequelize } from '../models';
import { Op } from 'sequelize';
import busInfoRouter from '../routers/busInfoRouter';


//---App---
//bus Inquiry
export const appBusInfo = async(req, res, next) => {
    try{
        const data = await busInfoRouter.findAll();
        res.json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//bus Stop
export const appBusStop = async(req, res, next) => {
    const { type, bus_date } = req.body;
    try{
        const data = await BusInfo.findAll({
            attributes: ['bus_stop','bus_id'],
            where: { type, bus_date },
            group: ['bus_stop'],
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//bus Time
export const appBusTime = async(req, res, next) => {
    const { type, bus_date, bus_stop } = req.body;
    try{
        const data = await BusInfo.findAll({
            attributes: ['bus_time', 'bus_id'],
            where: { type, bus_date, bus_stop },
        });
        res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//---Web---
//bus Inquiry
export const adminInquiry = async(req, res, next) => {
    const { bus_date, type } = req.body;
    try{
        const data = await BusInfo.findAll({
            where: {
                bus_date,
                type,
            },
            order: [['bus_times', 'ASC']],
        });
        res.json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//bus Update
export const adminBusUpdate = async(req, res, next) => {
    const { bus_time, bus_date, bus_id, type } = req.body;
    try{
        const data = await BusInfo.update(
            {
                bus_time,
            },
            {
                where: {
                    bus_date,
                    type,
                    bus_id,
                },
            }
        );

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//bus create
export const adminBusCreate = async(req, res, next) => {
    const { bus_date, bus_stop, bus_time, bus_times, type } = req.body;
    try{
        const data = await BusInfo.create({
            bus_date,
            bus_stop,
            bus_time,
            bus_times,
            type,
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//bus delete
export const adminBusDelete = async(req, res, next) => {
    const { bus_id } = req.body;
    try{
        const data = await BusInfo.destroy({
            where: {
                bus_id,
            },
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};