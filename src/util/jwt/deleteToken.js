import jwt from 'jsonwebtoken';
import verifyToken from './verifyToken';

const deleteToken = (req, res) => {
    const data = verifyToken(req.cookies.refreshToken); //cookie안에 refreshToken을 담아서 던져줌
    //리프레시키값(아이디) , access토큰
    //리프레시로 조회해서 가져와서 유저에 넣고 access토큰으로 다시 보내줌
}