import jwt from 'jsonwebtoken';

/**
 * 
 * @param {*} userObj - 유저 정보
 * @param {*} expiresIn - 만료기간
 * @description - JSON토큰을 만드는 함수입니다.
 * @returns 
 */
function createToken(userObj, expiresIn){
    const token = jwt.sign(userObj, 'hello', {expiresIn})
    return token;
}

export default createToken;