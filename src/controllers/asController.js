import { Op } from "sequelize";
import AsRequest from "../models/as_request";
import StdInfo from "../models/std_info";
import moment from "moment";

//---App---
//As Inquiry
export const asInquiry = async (req, res, next) => {
  try {
    const { start_date, end_date, limit } = req.query;
    const option = start_date &&
      end_date && [
        {
          request_date: {
            [Op.gte]: moment(start_date).toISOString(),
          },
        },
        { request_date: { [Op.lte]: moment(end_date) } },
      ];

    const data = await AsRequest.findAll({
      where: {
        std_id: req.user.std_id,
        [Op.and]: option ? option : [],
      },
      order: [["as_id", "DESC"]],
      limit: limit ? Number(limit) : 10,
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//As create
export const asCreate = async (req, res, next) => {
  const { title, content, vst_check } = req.body;
  try {
    await AsRequest.create({
      title,
      content,
      request_date: Date.now(),
      vst_check,
      std_id: req.user.std_id,
    });

    return res.status(200).send("Create Success");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//As update
export const asUpdate = async (req, res, next) => {
  const { title, content, vst_check, as_id } = req.body;
  try {
    await AsRequest.update(
      {
        title,
        content,
        vst_check,
        request_date: new Date(),
      },
      {
        where: {
          std_id: req.user.std_id,
          as_id,
        },
      }
    );

    return res.status(200).send("Update Success");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//As delete
export const asDelete = async (req, res, next) => {
  try {
    const data = await AsRequest.destroy({
      where: {
        as_id: req.body.as_id,
      },
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//---Web---
//As Inquiry
export const admAsInquiry = async (req, res, next) => {
  const { std_id, std_name, start_date, end_date, nowPage } = req.body;
  try {
    const data = await AsRequest.findAll({
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
        request_date: {
          [Op.gte]: start_date || "1970-01-01",
          [Op.lte]: end_date || "2038-01-01",
        },
        repair_date: null,
      },
      limit: 10,
      offset: nowPage ? (nowPage - 1) * 10 : 0,
      order: [["as_id", "DESC"]],
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const admaAllAsInquiry = async (req, res, next) => {
  try {
    const data = await AsRequest.findAll();

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//As Checked
export const admAsChecked = async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await AsRequest.update(
      { repair_date: Date.now() },
      {
        where: { as_id: id },
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//As Pagenum
export const admAsPageNum = async (req, res, next) => {
  const { std_id, std_name, start_date, end_date } = req.body;
  try {
    const data = await AsRequest.findAndCountAll({
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
        request_date: {
          [Op.between]: [start_date || "1970-01-01", end_date || "2038-12-31"],
        },
        repair_date: null,
      },
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
