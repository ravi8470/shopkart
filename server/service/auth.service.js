const jwt = require("jsonwebtoken");
require("dotenv").config();

export const generateToken = user => {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, process.env.JWT_SECRET);
};
