import { Op } from 'sequelize';
import HlthRequest from '../models/hlth_request';
import StdInfo from '../models/std_info';
import moment from 'moment';

//---App---
//Hlth Inquiry
export const hlthInquiry = async (req, res, next) => {
    const { start_date, end_date, limit } = req.query;
    const option = start_date &&
      end_date && [
        {
          date: {
            [Op.gte]: moment(start_date).toISOString(),
          },
        },
        { date: { [Op.lte]: moment(end_date).toISOString() } },
      ];
  
    try {
      const data = await HlthRequest.findAll({
        where: {
          std_id: req.user.std_id,
          [Op.and]: option ? option : [],
        },
        order: [["hlth_id", "DESC"]],
        limit: limit ? Number(limit) : 10,
      });
  
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

//Hlth Search
export const hlthSearch = async(req, res, next) => {
    const { startDate, endDate } = req.body;
    try{
        const data = await HlthRequest.findAll({
            where: {
                std_id: req.user.id,
                [Op.and]: [
                    {date: { [Op.gte]: moment(startDate).toISOString()}},
                    {date: { [Op.lte]: moment(endDate)}},
                ],
            },
            order: [['hlth_id', 'DESC']],
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Hlth Create
export const hlthCreate = async(req, res, next) => {
    const { date, start_time, end_time } = req.body;
    try{
        await HlthRequest.create({
            date,
            start_time,
            end_time,
            std_id: req.user.std_id,
        });

        return res.status(200).send('Success');
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Hlth Delete
export const hlthDelete = async(req, res, next) => {
    try{
        const data = await HlthRequest.destroy({
            where: {
              hlth_id: req.body.hlth_id,
              std_id: req.user.std_id,
            },
          });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//---Web---
//Hlth Inquiry 헬스 예약자 조회
export const admHlthInquiry = async(req, res, next) => {
    const { stdId, stdName, startDate, endDate, nowPage } = req.body;
    try{
        let Id = stdId;
        let Name = stdName;
        let StartDate = startDate;
        let EndDate = endDate;
        Id = Id || { [Op.ne]: null };
        Name = Name || { [Op.ne]: null };
        StartDate = StartDate || '1970-01-01';
        EndDate = EndDate || '2038-01-01';
        const data = await HlthRequest.findAll({
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
                std_id: Id,
                date: {
                    [Op.gte]: moment(StartDate).toISOString(),
                    [Op.lte]: moment(EndDate),
                },
            },
            order: [['hlth_id', 'DESC']],
            limit: 10,
            offset: (nowPage - 1) * 10,
        });
        
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Hlth Pagenum
export const admHlthPageNum = async(req, res, next) => {
    const { stdId, stdName, startDate, endDate } = req.body;
    try{
        let Id = stdId;
        let Name = stdName;
        let StartDate = startDate;
        let EndDate = endDate;
        Id = Id || { [Op.ne]: null };
        Name = Name || { [Op.ne]: null };
        StartDate = StartDate || '1970-01-01';
        EndDate = EndDate || '2038-01-01';
        const data = await HlthRequest.findAndCountAll({
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
                std_id: Id,
                date: {
                    [Op.gte]: moment(StartDate).toISOString(),
                    [Op.lte]: moment(EndDate),
                },
            },
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};