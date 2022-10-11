import Comment from '../models/comment';

//---App---
//Comment Inquiry
export const commentInquiry = async(req, res) => {
    const { bulletin_id } = req.query;
    try{
        const data = await Comment.findAndCountAll({
            where: {
                bulletin_id,
            },
        });
        return res.status(200).json(data);
    }catch (err){
        return res.status(404).send('Not Found');
    }
};

//Comment create
export const commentCreate = async(req, res) => {
    const { content, bulletin_id, ip } = req.body;
    if(!req.user){
        return;
    }
    try{
        await Comment.create({
            content,
            create_date: new Date(),
            std_id: req.user.std_id,
            ip,
            bulletin_id,
        });
        return res.status(200).send('Success');
    }catch (err) {
        return res.status(404).send('Not Found');
    }
};

//Comment Update
export const commentUpdate = async (req, res, next) => {
    const { comment_id, content } = req.body;
    try {
      await Comment.update(
        {
          content,
        },
        {
          where: {
            comment_id,
            std_id: req.user.std_id,
          },
        }
      );
      return res.status(200).send("Success");
    } catch (err) {
        next(err);
    }
};

//Comment Delete
export const commentDelete = async(req, res, next) => {
    const { comment_id } = req.body;
    try{
        await Comment.destroy({
            where: {
                comment_id,
                std_id: req.user.std_id,
            },
        });
        return res.status(200).send('Success');
    }catch (err) {
        next(err);
    }
};