import { Op } from 'sequelize';

//---Web---
//Holiday Inquiry
export const holidayInquiry = async(req, res, next) =>{
    const { name, date } = req.body;
    try{
        let Name = name;
        let Date = date;
        Name = Name || { [Op.ne]: null };
        Date = Date || { [Op.ne]: null };
        const data = await Holiday.findAll({
            where: {
                name: Name,
                date: Date,
            },
        });
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Holiday Create
export const holidayCreate = async(req, res, next) => {
    const { name, date } = req.body;
    try{
        const data = await Holiday.create({
            name,
            date,
        });
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Holiday Delete
export const holidayDelete = async(req, res, next) => {
    const { id } = req.body;
    try{
        const data = await Holiday.destroy({
            where: {
                holiday_id: id,
            },
        });
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};