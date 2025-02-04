const jwt = require("jsonwebtoken");
const { Jwt_key } = require("../keys");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Please login first!!" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, Jwt_key, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Please login first!" });
    }

    const { _id } = payload;
    USER.findById(_id).then((authData) => {
      req.user = authData;
      next();
    });
  });
};
