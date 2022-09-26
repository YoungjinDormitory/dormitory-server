// export const localsMiddleware = (req, res, next) => {
//     res.locals.loggedIn = Boolean(req.session.loggedIn);
//     res.locals.loggedInUser = req.session.user;
//     next();
// };

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