import Comment from '../models/comment';

//---App---
//Comment Inquiry
export const commentInquiry = async(req, res) => {
    const { bullentin_id } = req.body;
    try{
        const data = await Comment.findAndCountAll({
            where: {
                bullentin_id,
            },
        });
        return res.status(200).json(data);
    }catch (err){
        return res.status(404).send('Not Found');
    }
};

//Comment create
export const commentCreate = async(req, res) => {
    const { content, bullentin_id } = req.body;
    if(!req.user){
        return;
    }
    try{
        await Comment.create({
            content,
            create_date: new Date(),
            std_id: req.user.id,
            bullentin_id,
        });
        return res.status(200).send('Success');
    }catch (err) {
        return res.status(404).send('Not Found');
    }
};

//Comment Delete
export const commentDelete = async(req, res, next) => {
    const { comment_id } = req.body;
    try{
        await Comment.destroy({
            where: {
                comment_id,
            },
        });
        return res.status(200).send('Success');
    }catch (err) {
        next(err);
    }
};