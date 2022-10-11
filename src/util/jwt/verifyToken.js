import jwt from 'jsonwebtoken';

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, 'hello');
    return decoded
    } catch(err){
        throw Error(err);
    }
}

export default verifyToken;