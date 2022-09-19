import { Op } from 'sequelize';

//---App---
//Hlth Inquiry
export const appInquiry = async(req, res, next) => {
    try{
        const data = await HlthRequest.findAll({
            where: { std_id: req.user.id },
            order: [['hlth_id', 'DESC']],
        });
        
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Hlth Search
export const appSearch = async(req, res, next) => {
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
export const appCreate = async(req, res, next) => {
    const { date, start_time, end_time } = req.body;
    try{
        await HlthRequest.create({
            date,
            start_time,
            end_time,
            std_id: req.user.id,
        });

        return res.status(200).send('Success');
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Hlth Delete
export const appDelete = async(req, res, next) => {
    try{
        const data = await HlthRequest.destory({
            where: {
                hlth_id: req.body.hlth_id,
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
export const adminInquiry = async(req, res, next) => {
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
export const adminPageNum = async(req, res, next) => {
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