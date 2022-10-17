import passport from "passport";
import nodemailer from "nodemailer";
import crypto from "crypto";
import StdInfo from "../models/std_info";
import createToken from "../util/jwt/createToken";
import createHash from "../util/hash/createHash";
import verifyToken from "../util/jwt/verifyToken";
import AdmInfo from "../models/adm_info";

const transporter = nodemailer.createTransport({
  service: "Naver",
  auth: {
    user: process.env.E_MAIL, //mail
    pass: process.env.PASSWORD,
  },
});

//---App---
//App login
export const restoreAccessToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const refresh = verifyToken(refreshToken);
  try {
    const find = await StdInfo.findOne({
      where: {
        refresh_token: refresh.hash,
      },
    });

    if (find) {
      const { std_id, std_name } = find;
      const userObj = { std_id, std_name };
      const accessToken = createToken(userObj, "10s");
      return res.json({ accessToken });
    }
    return res.status(400).send("USER IS NOT FOUND");
  } catch (err) {
    next(err);
  }
};

//Admin Login
export const adminRestoreAccessToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const refresh = verifyToken(refreshToken);

  try {
    const find = await AdmInfo.findOne({
      where: {
        refresh_token: refresh.hash,
      },
    });

    if (find) {
      const { adm_id, adm_name } = find;
      const userObj = { adm_id, adm_name, role: "admin" };

      const accessToken = createToken(userObj, "10s");
      return res.json({ accessToken });
    } else {
      return res.status(400).send("USER IS NOT FOUND");
    }
  } catch (err) {
    next(err);
  }
};

export const user = async (req, res, next) => {
  if (req.user) {
    const user = await StdInfo.findOne({
      attribute: ["std_id, std_name, room_num"],
      where: {
        std_id: req.user.std_id,
      },
    });
    return res.json(user);
  } else {
    return res.status(404).send("YOU ARE GUEST");
  }
};

export const login = async (req, res, next) => {
  console.log(req.body);
  const { adm_id, password } = req.body;
  try {
    const userInfo = await AdmInfo.findOne({
      where: {
        adm_id,
        password,
      },
    });
    if (userInfo) {
      const userObj = { adm_name: userInfo.adm_name, adm_id };
      const accessToken = createToken(userObj, "1h");
      const hash = await createHash(userObj);
      const refreshToken = createToken({ hash }, "1y");
      res.cookie("refreshToken", refreshToken, {
        maxAge: 3.154e10,
        httpOnly: true,
      });
      return res.json({ accessToken });
    }
    return res.status(404).send("Login Failed");
  } catch (err) {
    next();
  }
};

//App logout
export const logout = async (req, res, next) => {
  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });
  return res.status(200).send("Success");
};

//App find password
export const findPw = async (req, res, next) => {
  try {
    const mailOptions = {
      from: process.env.E_MAIL, //email
      to: req.body.e_mail,
      subject: "hello",
      text: `이메일 인증 코드 ${req.body.hash}`,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.error(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.status(200).send("Success");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//App change password
export const changePw = async (req, res, next) => {
  try {
    await StdInfo.update(
      //db덤프 받으면
      {
        password: req.body.password,
      },
      {
        where: {
          e_mail: req.body.e_mail,
        },
      }
    );
    return res.status(200).send("Success");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//send Mail
export const sendMail = async (req, res, next) => {
  try {
    const { hash, e_mail } = req.body;
    const mailOptions = {
      from: process.env.E_MAIL,
      to: e_mail,
      subject: "hello",
      text: "해쉬 값은 : " + hash + "입니다. ",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        console.log(info.response);
      }
    });
    return res.status(200).send("Success");
  } catch (err) {
    next(err);
  }
};

//App Signup
export const signUp = async (req, res, next) => {
  const { std_id, std_name, password, ph_num, room_num, e_mail } = req.body;
  try {
    await StdWait.create({
      std_id,
      std_name,
      password,
      ph_num,
      room_num,
      e_mail,
    });
    return res.status(200).send("Success");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//---Web---
//login
export const adminLogin = async (req, res, next) => {
  const { adm_id, password } = req.body;
  try {
    const user = await AdmInfo.findOne({
      where: {
        adm_id,
        password,
      },
    });
    if (user) {
      const userObj = { adm_name: user.adm_name, adm_id, role: "admin" };
      const accessToken = createToken(userObj, "10s");
      const hash = await createHash(userObj);
      const refreshToken = createToken({ hash }, "1y");
      res.cookie("refreshToken", refreshToken, {
        maxAge: 3.154e10,
        httpOnly: true,
      });
      return res.json({ accessToken });
    }
    return res.status(404).send("login failed");
  } catch (err) {
    next();
  }
};

export const adminInfo = async (req, res, next) => {
  try {
    return res.json(req.user);
  } catch (err) {
    next(err);
  }
};
