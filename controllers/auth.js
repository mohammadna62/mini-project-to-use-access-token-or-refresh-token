const userModel = require("./../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { genrateAccessToken, genrateRefreshToken } = require("./../utils/auth");

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
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "wrong Password",
    });
  }
  const accessToken = genrateAccessToken(user.email);
  const refreshToken = genrateRefreshToken(user.email);
  await userModel.findOneAndUpdate({email},{
    $set:{refreshToken}
  })
  res.cookie("access-token", accessToken, { httpOnly: true });
  res.cookie("refresh-token", refreshToken, { httpOnly: true });

  return res.json({
    message: "User Loggedin Successfully"});
};


exports.refreshToken = async (req, res) => {
  //
};
