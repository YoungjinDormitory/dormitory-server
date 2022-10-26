import BusInfo from "../models/bus_info";
import { Op, fn, col } from "sequelize";

//---App---
//bus Inquiry
export const busInfo = async (req, res, next) => {
  try {
    const data = await BusInfo.findAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//bus Stop
export const busStop = async (req, res, next) => {
  const { type, bus_date } = req.query;
  try {
    const data = await BusInfo.findAll({
      attributes: ["bus_stop", "bus_id"],
      where: { type, bus_date },
      group: ["bus_stop"],
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//bus Time
export const busTime = async (req, res, next) => {
  const { type, bus_date, bus_stop } = req.body;
  try {
    const data = await BusInfo.findAll({
      attributes: ["bus_time", "bus_id"],
      where: { type, bus_date, bus_stop },
    });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//---Web---
//bus Inquiry
export const admBusPagenum = async (req, res, next) => {
  const { bus_date, type } = req.body;
  try {
    const data = await BusInfo.findAndCountAll({
      where: {
        bus_date: bus_date || { [Op.ne]: null },
        type: type || { [Op.ne]: null },
      },
    });
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const admBusInquiry = async (req, res, next) => {
  const { bus_date, type, nowPage } = req.body;
  try {
    const data = await BusInfo.findAll({
      where: {
        bus_date: bus_date || { [Op.ne]: null },
        type: type || { [Op.ne]: null },
      },
      limit: 10,
      offset: nowPage ? (nowPage - 1) * 10 : 0,
      order: [
        ["bus_date", "ASC"],
        ["type", "ASC"],
        ["bus_times", "ASC"],
        ["bus_time", "ASC"],
      ],
    });
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//bus Update
export const admBusUpdate = async (req, res, next) => {
  const { bus_time, bus_date, bus_id, type, bus_stop, bus_times } = req.body;
  try {
    const data = await BusInfo.update(
      {
        bus_time,
        bus_date,
        type,
        bus_stop,
        bus_times,
      },
      {
        where: {
          bus_id,
        },
      }
    );

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//bus create
export const admBusCreate = async (req, res, next) => {
  const { bus_date, bus_stop, bus_time, bus_times, type } = req.body;
  try {
    const data = await BusInfo.create({
      bus_date,
      bus_stop,
      bus_time,
      bus_times,
      type,
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//bus delete
export const admBusDelete = async (req, res, next) => {
  const { bus_id } = req.body;
  try {
    await BusInfo.destroy({
      where: {
        bus_id,
      },
    });

    return res.status(200).json("success");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const admBusStop = async (req, res, next) => {
  try {
    const data = await BusInfo.findAll({
      attributes: [fn("DISTINCT", col("bus_stop")), "bus_stop"],
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
