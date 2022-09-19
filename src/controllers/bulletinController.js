import { Op } from 'sequelize';
//db

//---App---
//Bulletin Inquiry
export const appInquiry = async(req, res) => {
    try{
        const data = await Bulletin.findAll({
            order: [['bulletin_id', 'DESC']],
        });
        
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        res.status(404);
    }
};

//Bulletin Image Inquiry
export const appImageInquiry = async(req, res) => {
    try{
        const data = await ImageArr.findAll({
            where: {
                bulletin_id: req.body.bulletin_id,
            },
        });

        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        res.status(404);
    }
};

//Bulletin Create
export const appCreate = async(req, res, next) => {
    const { title, content, images } = req.body;
    try{
        const data = await Bulletin.create({
            title,
            content,
            create_date: Date.now(),
            std_id: req.user.id,
        });
        if(images){
            images.forEach(async (image) => {
                await ImageArr.create({
                    path: image.localUri,
                    bulletin_id: data.dataValues.bulletin_id,
                });
            });
        }

        return res.status(200).send('Success');
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Bulletin Update
export const appUpdate = async(req, res, next) => {
    const { title, content, id, images } = req.body;
    try{
        await Bulletin.update(
            {
                title,
                content,
                create_date: new Date(),
            },  
            {
                where: {
                    bulletin_id: id,
                },
            }
        );
        await ImageArr.destory({
            where: {
                bulletin_id: id,
            },
        });
        if(images){
            images.forEach(async (image) => {
                await ImageArr.create(
                    {
                        path: image.localUri,
                        bulletin_id: id,
                    },
                    {
                        where: {
                            bulletin_id: id,
                        },
                    }
                );
            });
        }

        return res.status(200).send('Success');
    }catch (err) {
        return new Error(err);
    }
};

//Bulletin Search
export const appSearch = async(req, res, next) => {
    const { title } = req.body;
    try{
        const data = await Bulletin.findAll({
            where: {
                title: {
                    [Op.like]: '%' + title + '%', 
                },
            },
            order: [['bulletin_id', 'DESC']],
        });
        
        return res.status(200).json(data);
    }catch (err) {
        return new Error(err);
    }
};

//hot Btn Click
export const appClickHot = async(req, res) => {
    const { id } = req.body;
    try{
        const data = await Like.findOne({
            where: { bulletin_id: id, std_id: req.user.id },
        });
        if(!data) {
            await Like.create({ bulletin_id: id, std_id: req.user.id });
            await Bulletin.increment(
                { hot: 1 },
                { where: { bulletin_id: id }}
            );
            const hotNum = await Bulletin.findOne({
                attributes: ['hot'],
                where: {
                    bulletin_id: id,
                },
            });
            if(hotNum.dataValues.hot === 20) {
                await Hot.create({
                    bulletin_id: id,
                });
            }

            return res.status(200).json(hotNum);
        }else {
            return res.status(200).send('한번 이상 클릭 하셨습니다.');
        }
    }catch (err) {
        return new Error(err);
    }
};

//Bulletin Inquiry View
export const appInquiryView = async(req, res) => {
    try{
        await Bulletin.increment(
            { views: 1 },
            { where: { bulletin_id: req.body.id }}
        );
        return res.status(200).send('Watch Success');
    }catch (err) {
        console.trace(err);
        return res.status(404);
    }
};

//Bulletin Delete
export const appDelete = async(req, res, next) => {
    const { bulletin_id } = req.body;
    try{
        await Bulletin.destory({
            where: {
                bulletin_id,
            },
        });
        await Comment.destory({
            where: {
                bulletin_id,
            },
        });
        return res.status(200).send('Success');
    }catch (err) {
        console.error(err);
        next(err);
    }
};
