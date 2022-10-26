import { Op } from "sequelize";
import HlthRequest from "../models/hlth_request";
import StdInfo from "../models/std_info";
import moment from "moment";

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
export const hlthSearch = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  try {
    const data = await HlthRequest.findAll({
      where: {
        std_id: req.user.std_id,
        [Op.and]: [{ date: { [Op.gte]: moment(startDate).toISOString() } }, { date: { [Op.lte]: moment(endDate) } }],
      },
      order: [["hlth_id", "DESC"]],
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//Hlth Create
export const hlthCreate = async (req, res, next) => {
  const { date, start_time, end_time } = req.body;
  try {
    await HlthRequest.create({
      date,
      start_time,
      end_time,
      std_id: req.user.std_id,
    });

    return res.status(200).send("Success");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//Hlth Delete
export const hlthDelete = async (req, res, next) => {
  try {
    const data = await HlthRequest.destroy({
      where: {
        hlth_id: req.body.hlth_id,
        std_id: req.user.std_id,
      },
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//---Web---
//Hlth Inquiry 헬스 예약자 조회
export const admHlthInquiry = async (req, res, next) => {
  const { std_id, std_name, start_date, end_date, nowPage } = req.body;
  try {
    const data = await HlthRequest.findAll({
      include: [
        {
          model: StdInfo,
          where: {
            std_id: std_id || { [Op.ne]: null },
            std_name: std_name || { [Op.ne]: null },
          },
        },
      ],
      where: {
        std_id: std_id || { [Op.ne]: null },
        date: {
          [Op.gte]: start_date || "1970-01-01",
          [Op.lte]: end_date || "2038-12-31",
        },
      },
      order: [["hlth_id", "DESC"]],
      limit: 10,
      offset: (nowPage - 1) * 10,
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//Hlth Pagenum
export const admHlthPageNum = async (req, res, next) => {
  const { std_id, std_name, start_date, end_date } = req.body;
  try {
    const data = await HlthRequest.findAndCountAll({
      include: [
        {
          model: StdInfo,
          where: {
            std_id: std_id || { [Op.ne]: null },
            std_name: std_name || { [Op.ne]: null },
          },
        },
      ],
      where: {
        std_id: std_id || { [Op.ne]: null },
        date: {
          [Op.gte]: start_date || "1970-01-01",
          [Op.lte]: end_date || "2038-01-01",
        },
      },
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const admAllHlthInquiry = async (req, res, next) => {
  try {
    const data = await HlthRequest.findAll();

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
