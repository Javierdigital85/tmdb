const jwt = require("jsonwebtoken");
const { SECRET } = require("./envs");

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: "2d" }); //creamos el token
  return token;
};

//esta funcion es llamada por middleware/auth.js
const validateToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generateToken, validateToken };
