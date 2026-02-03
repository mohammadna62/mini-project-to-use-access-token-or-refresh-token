const jwt = reauire("jsonwebtoken");

const genrateAccessToken = (email) => {
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });
  return token;
};
const genrateRefreshToken = () => {
  const token = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = { genrateAccessToken, genrateRefreshToken };
