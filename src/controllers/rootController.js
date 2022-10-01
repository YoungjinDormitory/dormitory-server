import passport from 'passport';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import StdInfo from '../models/std_info';
import AdmInfo from '../models/adm_info';
import StdWait from '../models/std_wait';
import createToken from '../util/jwt/createToken';
import createHash from '../util/hash/createHash';
import verifyToken from '../util/jwt/verifyToken';

const transporter = nodemailer.createTransport({
    service:'naver',
    auth: {
        user: '@naver.com', //mail
        pass: 'password',
    }
})

//---App---
//App login
export const restoreAccessToken = async(req, res, next) => {
    const {refreshToken} = req.cookies; 
    const refresh = verifyToken(refreshToken);
    try{
        const find = await StdInfo.findOne({
            where: {
                refresh_token : refresh.hash
            }
        });
        if(find){
            const { std_id, std_name } = find;
            const userObj = { std_id, std_name };
            const accessToken = createToken(userObj,"10s")
            return res.json({ accessToken });
        }
        return res.status(400).send("USER IS NOT FOUND")
    }catch(err){
        next(err);
    }
}

export const user = async(req, res, next) => {
    if(req.user) {
        return res.json(req.user);
    }else {
        return res.status(404).send('YOU ARE GUEST');
    }
};

export const login = async(req, res, next) => {
    const { std_id, password } = req.body;
    try{
        const userInfo = await StdInfo.findOne({
            where: {
                std_id,
                password,
            },
        });
        const userObj = { std_name: userInfo.std_name, std_id };
        if(userInfo){
            const accessToken = createToken(userObj, '10s');
            const hash = await createHash(userObj)
            const refreshToken = createToken({ hash }, '1y');
            res.cookie('refreshToken', refreshToken,
            {
                maxAge: 3.154e10,
                httpOnly: true,
            })
            return res.json({accessToken});
        }
    }catch(err){
        console.log(err);
    }
};

//App logout
export const logout = async(req,res,next) => {
    req.logout((err) => {
        if(err){
            next(err);
        }
    });
    req.session.destory();
    return res.status(200).send('Success');
};

//App find password
export const findPw = async(req, res, next) => {
    try{
        const mailOptions = {
            from: '',//email
            to: req.body.e_mail,
            subject: 'hello',
            text: `이메일 인증 코드 ${req.body.hash}`,
        };
        transporter.sendMail(mailOptions, function (error, info){
            if(err){
                console.error(err);
            }else {
                console.log('Email sent: ' + info.response);
            }
        })
        return res.status(200).send('Success');
    }catch(err){
        console.error(err);
        next(err);
    }
}

//App change password
export const changePw = async(req, res, next) => {
    try{
        await StdInfo.update( //db덤프 받으면
            {
                password: req.body.password,
            },
            {
                where:{
                    e_mail: req.body.e_mail,
                },
            }
        )
        return res.status(200).send('Success');
    }catch(err){
        console.error(err);
        next(err);
    }
}

//App Signup
export const signUp = async(req, res, next) => {
    const { std_id, std_name, password, ph_num, room_num, e_mail } = req.body;
    try{
        const hash = crypto.randomBytes(10).toString('hex');
        // // const mailOptions = {
        // //     from: 'vnfmsqkekrn@gmail.com',
        // //     to: e_mail,
        // //     subject: 'hello',
        // //     text: 'Authification http://localhost:8000/auth/' + hash,
        // // };
        // transporter.sendMail(mailOptions, function (error, info){
        //     if(error){
        //         console.log(error);
        //     }else {
        //         console.log('Email sent: ' + info.response);
        //         console.log(info.response);
        //     }
        // });
        await StdInfo.create({
            std_id,
            std_name,
            password,
            ph_num,
            room_num,
            e_mail,
            hash: hash,
        });
        return res.status(200).send('Success');
    }catch(err) {
        console.error(err);
        next(err);
    }
};

//---Web---
//login
export const adminLogin = async(req,res,next) => {
    passport.authenticate('local:admin', (err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        } else if(info){
            return next(info);
        }

        return req.login(user, (loginErr) => {
            if(loginErr){
                return next(loginErr);
            }
            const filteredUser = Object.assign({}, user);
            delete filteredUser.password;
            return res.json(filteredUser);
        });
    })(req, res, next);
};

