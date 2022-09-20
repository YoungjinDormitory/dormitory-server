//db

//권한이 없는 학생 조회
export const stdInquiry = async(req, res, next) => {
    try{
        const data = await StdInfo.findAll({
            where: {
                access: false,
            },
        });
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//학생에게 사이트 로그인 권한 부여
export const  stdAgree = async(req, res, next) => {
    const { std_id } = req.body;
    try{
        let checkedStd = std_id; //체크된 학생 학번
        const data = await StdInfo.update(
            {
                access: true,
            },
            {
                where: { std_id: checkedStd }
            }
        );
        return res.status(200).json(200);
    }catch (err) {
        console.error(err);
        next(err);
    }
};

//로그인 권한 삭제 (DB에서 학생 정보 삭제)
export const stdDelete = async(req, res, next) => {
    const { std_id } = req.body;
    try{
        let checkedStd = std_id;
        const data = await StdInfo.destroy({
            where: { std_id: checkedStd }
        });
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        next(err);
    }
};