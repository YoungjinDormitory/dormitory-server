import { Op, fn, col } from 'sequelize';
import StdInfo from '../models/std_info';
import BusRequest from '../models/bus_request';
import moment from 'moment';

//---App---
//bus inquiry
export const busInquiry = async(req, res, next) => {
    try{
        const data = await BusRequest.findAll({
            where: {
                std_id: req.user.id,
            },
            order: [['bus_req_id', 'DESC']],
        });
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

//bus search
export const busSearch = async(req, res, next) => {
    try{
        const data = await BusRequest.findAll({
            where: {
                std_id: req.user.id,
                [Op.and]: [
                    {bus_date: {[Op.gte]: moment(req.body.startDate).toISOString()}},
                    {bus_date: {[Op.lte]: moment(req.body.endDate)}},
                ],
            },
            order: [['bus_req_id', 'DESC']],
        });
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//bus reservations
export const busCreate = async(req, res, next) => {
    const { bus_date, bus_way, bus_stop, bus_time } = req.body;
    try{
        await BusRequest.create({
            bus_date,
            bus_way,
            bus_stop,
            bus_time,
            std_id: req.user.id,
        });

        return res.status(200).send('Create Success');
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//bus revision
export const busUpdate = async(req, res, next) => {
    const { bus_date, bus_way, bus_stop, bus_time } = req.body;
    try{
        const data = await BusRequest.update(
            {
                bus_date,
                bus_way,
                bus_stop,
                bus_time,
            },
            {
                where: {
                    bus_req_id,
                    std_id: req.user.id,
                },
            }
        );
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
}

//bus delete
export const busDelete = async(req, res, next) => {
    try{
        const data = await BusRequest.destory({
            where:{
                bus_req_id: req.body.bus_req_id,
            },
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//---Web---
//bus 예약자 inquiry
export const admBusHome = async(req, res, next) => {
    const { nowPage, stdId, stdName, busStop, date } = req.body;
    try{
        console.log(nowPage);
        let Id = stdId;
        let Name = stdName;
        let BusStop = busStop;
        let BusDate = date;
        Id = Id || { [Op.ne]: null};
        Name = Name || { [Op.ne]: null};
        BusStop = BusStop || { [Op.ne]: null};
        BusDate = BusDate || { [Op.ne]: null};

        const data = await BusRequest.findAll({
            include: [
                {
                    model: StdInfo,
                    where: {
                        std_id: Id,
                        std_name: Name,
                    },
                },
            ],
            where: {
                bus_date: BusDate,
                bus_stop: busStop,
            },
            order: [['bus_req_id', 'DESC']],
            limit: 10,
            offset: (nowPage - 1) * 10,
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//bus pageNum
export const admBusPageNum = async(req, res, next) => {
    const { nowPage, stdId, stdName, busStop, date } = req.body;
    try{
        let Id = stdId;
        let Name = stdName;
        let BusStop = busStop;
        let BusDate = date;
        Id = Id || { [Op.ne]: null };
        Name = Name || { [Op.ne]: null };
        BusStop = BusStop || { [Op.ne]: null};
        BusDate = BusDate || { [Op.ne]: null};

        const data = await BusRequest.findAll({
            include: [
                {
                    model: StdInfo,
                    where: {
                        std_id: Id,
                        std_name: Name,
                    },
                },
            ],
            where: {
                bus_date: BusDate,
                bus_stop: busStop,
            },
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//bus inquiry
export const admBusInquiry = async(req, res, next) => {
    try{
        const now = new Date();
        now.setMonth(now.getMonth() + 1);
        const data = await BusRequest.findAll({
            attributes: [
                'bus_date',
                'bus_time',
                [fn('COUNT', col('bus_req_id')), 'people_count'],
            ],
            where: {
                bus_stop: req.body.type ? '복현캠퍼스' : '글로벌생활관',
                bus_date: {
                    [Op.lte]: moment(now).toISOString(),
                },
            },
            group: ['bus_date', 'bus_time'],
            raw: true,
        });
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};