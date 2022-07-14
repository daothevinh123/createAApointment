var jwt = require("jsonwebtoken");
const { conn, sql } = require("../sql/connect.js");
const Login = require("../model/sqlModel/login.model.js");
const model = new Login();
var refreshTokens = [];
var userInfo = "";
exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) {
    res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      { username: data.username },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "5h",
      }
    );
    var newReFreshToken = jwt.sign(
      { id: userInfo },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "10h" }
    );
    refreshTokens.push(newReFreshToken);
    res.cookie("refreshToken", newReFreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 60000 * 60 * 10),
    });
    res.json({ accessToken, a: "1" });
  });
};
exports.Logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");

    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );

    res.status(200).json("logout success");
  } catch (err) {
    res.status(400).json("Failure");
  }
};

exports.Login = async (req, res) => {
  userInfo = req.body.username;
  model.createLogin(req.body, function (err, data) {
    if (data === null) {
      res.send({ result: data, error: err, status: 404 });
    } else {
      var token = jwt.sign({ id: userInfo }, process.env.JWT_ACCESS_KEY, {
        expiresIn: "5h",
      });
      var refreshToken = jwt.sign(
        { id: userInfo },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "10h" }
      );
      refreshTokens.push(refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: false,
        secure: true,
        expires: new Date(Date.now() + 60000 * 60 * 10),
      });

      res.json({
        person_id: data.recordset[0].person_id,
        error: err,
        token: token,
        status: "ok",
        refreshToken: refreshToken,
      });
    }
  });
};
