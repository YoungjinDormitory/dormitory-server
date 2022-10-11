import { Op } from 'sequelize';
import Hot from '../models/hot';
import Bulletin from '../models/bulletin';

//---App---
//hot Inquiry
export const hotInquire = async(req, res) => {
    const { page, limit } = req.query;
        try {
            const data = await Hot.findAll({
                offset: (Number(page) - 1) * Number(limit),
                limit: Number(limit),
                include: [
                    {
                    model: Bulletin,
                    },
                ],
                order: [["hot_id", "DESC"]],
            });
            const sendData = data.map((el) => el.dataValues.Bulletin); //?dataValue?
            res.status(200).json(sendData);
        } catch (err) {
            console.error(err);
            res.status(404).send("Failed");
        }
};

export const hotCount = async (req, res) => {
    try {
      const data = await Hot.count();
      res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(404).send("Failed");
    }
  };
  