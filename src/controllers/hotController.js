import { Op } from 'sequelize';
//db

//---App---
//hot Inquiry
export const appInquire = async(req, res) => {
    try{
        const data = await Hot.findAll({
            include: [
                {
                    model: Bulletin,
                },
            ],
            where: { bulletin_id: { [Op.ne]: null }},
            order: [['hot_id', 'DESC']],
        });
        const sendData = data.map((el) => el.dataVlaues.Bulletin); //?dataValue?
        res.status(200).json(sendData);
    }catch (err) {
        console.error(err);
        res.status(404).send('Failed');
    }
};