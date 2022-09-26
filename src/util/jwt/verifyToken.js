import jwt from 'jsonwebtoken';

function verifyToken(token) {
    try { const decoded = jwt.verify(token, 'hello')
    return decoded}catch(err){
        console.log('errrorr');
    }
}


export default verifyToken;