import { Op, fn, col } from "sequelize";
import StdInfo from "../models/std_info";
import BusRequest from "../models/bus_request";
import moment from "moment";

//---App---
//bus inquiry
export const busInquiry = async (req, res, next) => {
  try {
    const { start_date, end_date, limit } = req.query;
    const option = start_date &&
      end_date && [
        {
          bus_date: {
            [Op.gte]: moment(start_date).toISOString(),
          },
        },
        { bus_date: { [Op.lte]: moment(end_date).toISOString() } },
      ];

    const data = await BusRequest.findAll({
      where: {
        std_id: req.user.std_id,
        [Op.and]: option ? option : [],
      },
      order: [["bus_req_id", "DESC"]],
      limit: limit ? Number(limit) : 10,
    });
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//bus search
export const busSearch = async (req, res, next) => {
  try {
    const data = await BusRequest.findAll({
      where: {
        std_id: req.user.std_id,
        [Op.and]: [{ bus_date: { [Op.gte]: moment(req.body.startDate).toISOString() } }, { bus_date: { [Op.lte]: moment(req.body.endDate) } }],
      },
      order: [["bus_req_id", "DESC"]],
    });
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//bus reservations
export const busReservations = async (req, res, next) => {
  const { bus_date, bus_way, bus_stop, bus_time } = req.body;
  try {
    await BusRequest.create({
      bus_date,
      bus_way,
      bus_stop,
      bus_time,
      std_id: req.user.std_id,
    });

    return res.status(200).send("Create Success");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//bus revision
export const busRevision = async (req, res, next) => {
  const { bus_date, bus_way, bus_stop, bus_time } = req.body;
  try {
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
          std_id: req.user.std_id,
        },
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//bus delete
export const busDelete = async (req, res, next) => {
  try {
    const data = await BusRequest.destroy({
      where: {
        bus_req_id: req.body.bus_req_id,
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
//bus 예약자 inquiry
export const admBusHome = async (req, res, next) => {
  const { nowPage, std_id, std_name, bus_stop, date } = req.body;
  try {
    const data = await BusRequest.findAll({
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
        bus_date: date || { [Op.ne]: null },
        bus_stop: bus_stop || { [Op.ne]: null },
      },
      order: [["bus_req_id", "DESC"]],
      limit: 10,
      offset: (nowPage - 1) * 10,
    });
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//bus pageNum
export const admBusPageNum = async (req, res, next) => {
  const { std_id, std_name, bus_stop, date } = req.body;
  try {
    const data = await BusRequest.findAndCountAll({
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
        bus_date: date || { [Op.ne]: null },
        bus_stop: bus_stop || { [Op.ne]: null },
      },
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const admAllBusInquiry = async (req, res, next) => {
  try {
    const data = await BusRequest.findAll();

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
