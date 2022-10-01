import { Op } from 'sequelize';
import StayoutRequest from '../models/stayout_request';
import StdInfo from '../models/std_info';
import moment from 'moment';

//---App---
//Stayout Inquiry
export const stayoutInquiry = async(req, res, next) => {
    try{
        const data = await StayoutRequest.findAll({
            where: { std_id: req.user.id },
            order: [['stayout_id', 'DESC']],
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Stayout Create
export const stayoutCreate = async(req, res, next) => {
    const { start_date, end_date } = req.body;
    try{
        await StayoutRequest.create({
            start_date,
            end_date,
            std_id: req.user.id,
        });

        return res.status(200).send('Success');
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Stayout Update
export const stayoutUpdate = async(req, res, next) => {
    const { start_date, end_date, stayout_id } = req.body;
    try{
        const data = await StayoutRequest.update({
            start_date,
            end_date,
        },
        {
            where: {
                std_id: req.user.std_id,
                stayout_id,
            },
        });

        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

//Stayout Delete
export const stayoutDelete = async(req, res, next) => {
    const { stayout_id } = req.body;
    try{
        console.log(req.body);
        const data = await StayoutRequest.destory({
            where: {
                stayout_id,
            },
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//---Web---
//Stayout Inquiry
export const admStayoutInquiry = async(req, res, next) => {
    const { std_id, std_name, nowPage } = req.body;
    try{
        let Id = std_id;
        let Name = std_name;
        let page = nowPage;
        Id = Id || { [Op.ne]: null };
        Name = Name || { [Op.ne]: null };
        if(!page){
            page = 1;
        }
        const data = await StayoutRequest.findAll({
            include: [
                {
                    model: StdInfo,
                    where: {
                        std_id: Id,
                        std_name: Name,
                    },
                },
            ],
            order: [['stayout_id', 'DESC']],
            limit: 10,
            offset: (page - 1) * 10,
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Stayout PageNum
export const admStayoutPageNum = async(req, res, next) => {
    const { std_id, std_name } = req.body;
    try{
        let Id = std_id;
        let Name = std_name;
        Id = Id || { [Op.ne]: null };
        Name = Name || { [Op.ne]: null };
        const data = await StayoutRequest.findAndCountAll({
            include: [
                {
                    model: StdInfo,
                    where: {
                        std_id: Id,
                        std_name: Name,
                    },
                },
            ],
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Stayout People Date
export const admStayoutDate = async(req, res, next) => {
    try{
        const dataArr = [];
        const now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        for(let i = 0; i < 31; i++){
            const data = await StayoutRequest.findAndCountAll({
                where: {
                    start_date: {
                        [Op.lte]: moment(now),
                    },
                    end_date: {
                        [Op.gte]: moment(now),
                    },
                },
            });
            now.setDate(now.getDate() + 1);
            dataArr.push(data);
        }
        
        return res.status(200).send(dataArr);
    }catch (err) {
        console.error(err);
        next(err);
    }
};