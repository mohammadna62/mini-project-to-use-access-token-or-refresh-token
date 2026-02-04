const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    try {
      const accessTokenPayload = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
      );
      req.email = accessTokenPayload.email;
      next();
    } catch (err) {
      return res.json({ message: "Token Is Expired" });
    }
  } else {
    return res.status(401).json({ message: "You can not access to this API" });
  }
};

module.exports = verifyToken;














