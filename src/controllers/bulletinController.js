import { Op } from 'sequelize';
import Comment from '../models/comment';
import Bulletin from '../models/bulletin';
import ImageArr from '../models/image_arr';
import Hot from '../models/hot';
import Like from '../models/like';
import fs from 'fs';

//---App---
//Bulletin Inquiry
export const bulletinInquiry = async(req, res) => {
    const { page, limit } = req.query;
    try{
        const data = await Bulletin.findAll({
            offset: (Number(page) - 1) * Number(limit),
            limit: Number(limit),
            order: [['bulletin_id', 'DESC']],
        });
        
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        return res.status(404);
    }
};

//Bulletin Detail
export const bulletinDetail = async(req, res, next) => {
    try{
        const { bulletin_id } = req.query;
        const data = await Bulletin.findOne({
            where: {
            bulletin_id,
        },
    });
    return res.status(200).json(data);
  } catch (err) {
        console.error(err);
        return res.status(404);
    }
}

//Bulletin Count
export const bulletinCount = async (req, res, next) => {
    try {
      const count = await Bulletin.count();
      return res.status(200).json(count);
    } catch (err) {
        console.error(err);
        return next();
    }
  };

//Bulletin Image Inquiry
export const bulletinImgInquiry = async(req, res) => {
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
export const bulletinCreate = async(req, res, next) => {
    const { title, content } = req.body;
    try{ //게시글 생성
        const bulletin = await Bulletin.create({
            title,
            content,
            create_date: Date.now(),
            std_id: req.user.std_id,
        });
        //이미지 배열에 경로 넣기
        for(let file of req.files){
            await ImageArr.create({
                path: process.env.MY_DOMAIN + "/images/" + file.filename,
                bulletin_id: bulletin.bulletin_id,
            });
        }

        return res.status(200).send('Success');
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//Bulletin Update
export const bulletinUpdate = async(req, res, next) => {
    const { title, content, bulletin_id, should_delete_img } = req.body;
    try{
        await Bulletin.update(
            {
                title,
                content,
                create_date: new Date(),
            },  
            {
                where: {
                    bulletin_id,
                },
            }
        );
        //만약 삭제해야 될 이미지가 있으면 삭제
        if (should_delete_img) {
            if (typeof should_delete_img != "object") {
              should_delete_img = [should_delete_img];
            }
            const imgArr = await ImageArr.findAll({
              where: {
                image_id: {
                  [Op.in]: should_delete_img,
                },
              },
            });
      
            try {
              imgArr.forEach((el) => {
                fs.unlinkSync("src/public/images/" + el.path.split("/")[4]);
              });
            } catch (err) {}
      
            await ImageArr.destroy({
              where: {
                image_id: {
                  [Op.in]: should_delete_img,
                },
              },
            });
          }
        //추가할 이미지가 있으면 추가
        for (let file of req.files) {
            await ImageArr.create({
              path: process.env.MY_DOMAIN + "/images/" + file.filename,
              bulletin_id,
            });
        }

        return res.status(200).send('Success');
    }catch (err) {
        return new Error(err);
    }
};

//Bulletin Search
export const bulletinSearch = async(req, res, next) => {
    const { keyword, page, limit } = req.query;
    try{
        const data = await Bulletin.findAll({
            where: {
                title: {
                    [Op.like]: '%' + keyword + '%', 
                },
            },
            offset: (Number(page) - 1) * Number(limit),
            limit: Number(limit),
            order: [['bulletin_id', 'DESC']],
        });
        
        return res.status(200).json(data);
    }catch (err) {
        return new Error(err);
    }
};

//Bulletin Search Count
export const bulletinSearchCount = async (req, res, next) => {
    const { keyword } = req.query;
    try {
      const count = await Bulletin.count({
        where: {
          title: {
            [Op.like]: "%" + keyword + "%",
          },
        },
      });
      return res.status(200).json(count);
    } catch (err) {
        console.error(err);
        return next();
    }
  };

//hot Btn 
export const bulletinClickHot = async(req, res) => {
    const { bulletin_id } = req.body;
    try {
        const data = await Like.findOne({
        where: { bulletin_id, std_id: req.user.std_id },
    });
        if (!data) {
            await Like.create({ bulletin_id, std_id: req.user.std_id });
            await Bulletin.increment({ hot: 1 }, { where: { bulletin_id } });
            const hotNum = await Bulletin.findOne({
                attributes: ["hot"],
                where: {
                    bulletin_id,
                },
            });
        if (hotNum.dataValues.hot === 20) {
            await Hot.create({
                bulletin_id,
            });
        }

            return res.status(200).json(hotNum);
        }else {
            return res.status(400).send('한번 이상 클릭 하셨습니다.');
        }
    }catch (err) {
        return new Error(err);
    }
};

//Bulletin Inquiry View
export const bulletinInquiryView = async(req, res) => {
    try{
        await Bulletin.increment(
            { views: 1 },
            { where: { bulletin_id: req.body.bulletin_id }}
        );
        return res.status(200).send('Watch Success');
    }catch (err) {
        console.trace(err);
        return res.status(404);
    }
};

//Bulletin Delete
export const bulletinDelete = async (req, res, next) => {
    const { bulletin_id } = req.body;
  
    try {
      const imgArr = await ImageArr.findAll({
        where: {
          bulletin_id,
        },
      });
  
      try {
        imgArr.forEach((el) => {
          console.log(el);
          fs.unlinkSync("src/public/images/" + el.path.split("/")[4]);
        });
      } catch (err) {}
  
      await ImageArr.destroy({
        where: {
          bulletin_id,
        },
      });
      await Bulletin.destroy({
        where: {
          bulletin_id,
        },
      });
  
      await Comment.destroy({
        where: {
          bulletin_id,
        },
      });
      return res.status(200).send("Success");
    } catch (err) {
      console.error(err);
      next(err);
    }
};