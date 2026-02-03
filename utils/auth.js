const jwt = require("jsonwebtoken");

const genrateAccessToken = (email) => {
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
  return token;
};
const genrateRefreshToken = (email) => {
  const token = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = { genrateAccessToken, genrateRefreshToken };
