import passport from 'passport';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import StdInfo from '../models/std_info';
import AdmInfo from '../models/adm_info';
import StdWait from '../models/std_wait';


const transporter = nodemailer.createTransport({
    service:'naver',
    auth: {
        user: '@naver.com', //mail
        pass: 'password',
    }
})

export const startLogin = async(req, res) => {
    const tokenRequest = await(
        await fetch('',{//url?
            method: 'POST',
            headers: {
                Accept: 'application/json',
            }
        })
    ).json();
    if('access_token' in tokenRequest){
        const {access_token} = tokenRequest;
        const userRequest = await(
            await fetch('url', {
                headers: {
                    Authorization: `token${access_token}`,
                },
            })
        ).json();
        console.log(userRequest);
    }else{
        return res.redirect('/');
    }
}

//---App---
//App login
export const login = async(req, res, next) => {
    passport.authenticate('local:user', (err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        }else if(info){
            return next(info);
        }
        return req.login(user, (loginErr) => {
            if(loginErr) {
                return next(loginErr);
            }
            const filteredUser = Object.assign({}, user);
            delete filteredUser.password;

            return res.json(filteredUser);
        });
    })(res, req, next);
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
    } catch(err){
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
    } catch(err){
        console.error(err);
        next(err);
    }
}

//App Signup
export const signUp = async(req, res, next) => {
    const { std_id, std_name, password, ph_num, room_num, e_mail } = req.body;
    try{
        const hash = crypto.randomBytes(10).toString('hex');
        const mailOptions = {
            from: '',//email
            to: e_mail,
            subject: 'hello',
            text: 'Authification http://localhost:3001/auth/' + hash,
        };
        transporter.sendMail(mailOptions, function (error, info){
            if(error){
                console.log(error);
            }else {
                console.log('Email sent: ' + info.response);
                console.log(info.response);
            }
        });
        await StdWait.create({
            std_id,
            std_name,
            password,
            ph_num,
            room_num,
            e_mail,
            hash: hash,
        });

        return res.status(200).send('Success');
    }catch (err) {
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

