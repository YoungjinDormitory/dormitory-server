import BusInfo from '../models/bus_info';

//---App---
//bus Inquiry
export const busInfo = async(req, res, next) => {
    try{
        const data = await BusInfo.findAll();
        res.json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//bus Stop
export const busStop = async(req, res, next) => {
    const { type, bus_date } = req.query;
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
export const busTime = async(req, res, next) => {
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
export const admBusInquiry = async(req, res, next) => {
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
export const admBusUpdate = async(req, res, next) => {
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
export const admBusCreate = async(req, res, next) => {
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
export const admBusDelete = async(req, res, next) => {
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