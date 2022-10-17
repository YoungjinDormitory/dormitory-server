import StdInfo from "../models/std_info";
import StdWait from "../models/std_wait";

//권한이 없는 학생 조회
export const stdAgreeInquiry = async (req, res, next) => {
  try {
    const data = await StdWait.findAndCountAll();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const stdInquiry = async (req, res, next) => {
  try {
    const data = await StdInfo.findAndCountAll();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//학생에게 사이트 로그인 권한 부여
export const stdAgree = async (req, res, next) => {
  const { std_id, std_name, ph_num, room_num, password, e_mail } = req.body;
  try {
    console.log(req.body);
    const createData = await StdInfo.create({ std_id, std_name, ph_num, room_num, password, e_mail, access: 1 });
    const deleteData = await StdWait.destroy({ where: { std_id } });
    const data = await StdWait.findAll();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//로그인 권한 삭제 (DB에서 학생 정보 삭제)
export const stdDelete = async (req, res, next) => {
  const { std_id } = req.body;
  try {
    let checkedStd = std_id;
    const deleteData = await StdInfo.destroy({
      where: { std_id: checkedStd },
    });
    const data = await StdInfo.findAll();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
