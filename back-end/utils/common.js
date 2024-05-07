const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.hashPassword = (password) => {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, 11, function (err, hash) {
      if (err) {
        err = false;
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

module.exports.comparePassword = function (password, hash) {
  return new Promise(function (resolve) {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        err = false;
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports.generateAccessToken = (payload) => {
  return new Promise(async function (resolve) {
    try {
      let token = jwt.sign(payload, "Neokred", {
        expiresIn: "5m",
      });
      resolve(token);
    } catch (error) {
      resolve(error);
    }
  });
};

module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "Neokred");
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or expired token" });
  }
};
