const userModel = require("./../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("./../utils/auth");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const result = await userModel.create({
    username,
    password, // Hash
    email,
  });
  res.status(201).json({ message: "user created" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "wrong Email",
    });
  }
  const isPasswordTrue = bcrypt.compare(password, user.password);
  if (!isPasswordTrue) {
    return res.status(401).json({ message: "wrong password" });
  }
  const accessToken = generateAccessToken(user.email);
  const refreshToken = generateRefreshToken(user.email);
  await userModel.findOneAndUpdate(
    { email },
    {
      $set: { refreshToken },
    },
  );
  res.cookie("access-token", accessToken, { httpOnly: true });
  res.cookie("refresh-token", refreshToken, { httpOnly: true });

  return res.json({
    message: "User LoggedIn Successfully",
  });
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["refresh-token"];

    if (!refreshToken) {
      return res.status(401).json({ message: "No have refresh token" });
    } else {
      const user = await userModel.findOne({ refreshToken });
      if (!user) {
        return res.status(403).json({ message: "User Not font" });
      }
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const newAccessToken = generateAccessToken(user.email);
      res.cookie("access-token",newAccessToken, {httpOnly:true})
      res.status(200).json({ accessToken: newAccessToken });
    }
  } catch (err) {
    throw new Error(err);
  }
};
