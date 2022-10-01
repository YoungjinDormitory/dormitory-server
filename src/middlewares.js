import verifyToken from "./util/jwt/verifyToken";

export const deserializeUser = (rqe, res, next)=>{
    const accessToken = req.header.Authorization;
    try{ 
        const payload = verifyToken(accessToken)
        req.user = payload;
    }catch (err){
        console.log('err');
        return res.status(401).send('Authorization Error');
    }
}