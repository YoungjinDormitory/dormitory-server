import Notice from "../models/notice";

export async function getNotice(req, res, next) {
  const { page, limit } = req.body;
  try {
    const data = await Notice.findAll({
      offset: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
      order: [["notice_id", "DESC"]],
    });
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(404);
  }
}

export async function getNoticeDetail(req, res, next) {
  try {
    const { notice_id } = req.body;
    const data = await Notice.findOne({
      where: {
        notice_id,
      },
    });
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(404);
  }
}

export async function noticeCreate(req, res, next) {
  try {
    const { title, content } = req.body;
    const { adm_id } = req.user;
    const data = await Notice.create({
      title,
      content,
      create_date: Date.now(),
      adm_id,
    });
    return res.status(200).json("success");
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export async function noticeDelete(req, res, next) {
  try {
    const { notice_id } = req.body;
    const data = await Notice.destroy({
      where: {
        notice_id,
      },
    });
    return res.status(200).json("success");
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export async function noticeModify(req, res, next) {
  try {
    const { notice_id, title, content } = req.body;
    console.log(req.body);
    const data = await Notice.update(
      {
        title,
        content,
      },
      {
        where: {
          notice_id,
        },
      }
    );

    return res.status(200).json("success");
  } catch (err) {
    console.error(err);
    next(err);
  }
}

//Bulletin Inquiry View
export const noticeInquiryView = async (req, res) => {
  try {
    await Notice.increment({ views: 1 }, { where: { notice_id: req.body.notice_id } });
    return res.status(200).send("Watch Success");
  } catch (err) {
    console.trace(err);
    return res.status(404);
  }
};
