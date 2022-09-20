import { Op } from 'sequelize';


//---App---
//Menu 출력?
export const appMenu = async(req, res, next) => {
    try{
        const startNow = new Date();
        const endNow = new Date();
        const startDay = startNow.getDate() - startNow.getDay();
        const endDay = endNow.getDate() + (6 - endNow.getDay());
        startNow.setDate(startDay);
        endNow.setDate(endDay);
        
        const startDate = startNow;
        const endDate = endNow;
        const data = await MenuList.findAll({
            where: {
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
            order: [['date', 'ASC']],
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Menu Exist ?
export const menuExist = async(req, res, next) => {
    const { date } = req.body;
    try{
        const data = await MenuList.findOne({
            where: {
                date: moment(date),
            },
        });
        if(data === null){
            return res.status(200).send(false);
        }
        return res.status(200).send(true);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//---Web---
//Menu Inquiry
export const menuInquiry = async(req, res, next) => {
    const { startDate, endDate, nowPage } = req.body;
    try{
        let StartDate = startDate;
        let EndDate = endDate;
        StartDate = StartDate || '1970-01-01';
        EndDate = EndDate || '2038-01-19';
        const data = await MenuList.findAll({
            where: {
                date: {
                    [Op.between]: [StartDate, EndDate],
                },
            },
            order: [['date', 'DESC']],
            limit: 10,
            offset: (nowPage - 1) * 10,
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Menu PageNum
export const menuPageNum = async(req, res, next) => {
    const { startDate, endDate } = req.body;
    try{
        let StartDate = startDate;
        let EndDate = endDate;
        StartDate = StartDate || '1970-01-01';
        EndDate = EndDate || '2038-01-19';
        const data = await MenuList.findAndCountAll({
            where: {
                date: {
                    [Op.between]: [StartDate, EndDate],
                },
            },
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Menu Update
export const menuUpdate = async(req, res, next) => {
    const { breakfast, lunch, dinner, date } = req.body;
    try{
        const data = await MenuList.update(
            {
                breakfast,
                lunch,
                dinner,
            },
            {
                where: {
                    date: moment(date),
                },
            }
        );

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Menu create
export const MenuCreate = async(req, res, next) => {
    const { date, breakfast, lunch, dinner } = req.body;
    try{
        const data = await MenuList.create({
            date,
            breakfast,
            lunch,
            dinner,
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Menu Delete
export const MenuDelete = async(req, res, next) => {
    const { date } = req.body;
    try{
        const data = await MenuList.destroy({
            where: {
                date,
            },
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};