const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "WEB73-LESSON");
    if (decoded) {
      next();
    }
  } catch (err) {
    res.send("Invalid token");
  }
};

module.exports = verifyAuth;
