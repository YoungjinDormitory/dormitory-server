import verifyToken from "./util/jwt/verifyToken";

export const deserializeUser = (req, res, next) => {
  const { refreshToken } = req.cookies;
  let accessToken = req.headers.authorization;

  if (!refreshToken || !req.headers.hasOwnProperty("authorization")) {
    return next();
  }
  try {
    console.log("why came here?");
    const payload = verifyToken(accessToken);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).send("Authorization Error");
  }
};