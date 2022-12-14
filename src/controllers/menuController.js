import { Op } from "sequelize";
import moment from "moment";
import MenuList from "../models/menu_list";

//---App---
//Menu 출력?
export const menu = async (req, res, next) => {
  try {
    const startNow = new Date();
    const endNow = new Date();
    const startDay = startNow.getDate() - startNow.getDay();
    const endDay = endNow.getDate() + (6 - endNow.getDay());
    startNow.setDate(startDay - 1);
    endNow.setDate(endDay);

    const startDate = startNow;
    const endDate = endNow;
    const data = await MenuList.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["date", "ASC"]],
    });

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

//Menu Exist ?
export const menuExist = async (req, res, next) => {
  const { date } = req.body;
  try {
    const data = await MenuList.findOne({
      where: {
        date: moment(date),
      },
    });
    if (data === null) {
      return res.status(200).send(false);
    }
    return res.status(200).send(true);
  } catch (err) {
    next(err);
  }
};

//---Web---
//Menu Inquiry
export const admMenuInquiry = async (req, res, next) => {
  const { start_date, end_date, nowPage } = req.body;
  try {
    const data = await MenuList.findAll({
      where: {
        date: {
          [Op.between]: [start_date || "1970-01-01", end_date || "2038-01-19"],
        },
      },
      order: [["date", "DESC"]],
      limit: 4,
      offset: (nowPage - 1) * 4,
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//Menu PageNum
export const admMenuPageNum = async (req, res, next) => {
  const { start_date, end_date } = req.body;
  try {
    const data = await MenuList.findAndCountAll({
      where: {
        date: {
          [Op.between]: [start_date || "1970-01-01", end_date || "2038-01-19"],
        },
      },
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//Menu Update
export const admMenuUpdate = async (req, res, next) => {
  const { breakfast, lunch, dinner, date } = req.body;
  try {
    const data = await MenuList.update(
      {
        breakfast,
        lunch,
        dinner,
      },
      {
        where: {
          date,
        },
      }
    );

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//Menu create
export const admMenuCreate = async (req, res, next) => {
  const { date, breakfast, lunch, dinner } = req.body;
  try {
    const data = await MenuList.create({
      date,
      breakfast,
      lunch,
      dinner,
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//Menu Delete
export const admMenuDelete = async (req, res, next) => {
  const { date } = req.body;
  try {
    const data = await MenuList.destroy({
      where: {
        date,
      },
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
