//este archivo se usa para hacer las relaciones

const User = require("./User");
const Favs = require("./Favs");
const Serie = require("./Serie");

Favs.belongsTo(User, { as: "prospect" });
Serie.belongsTo(User, { as: "prospect" });

module.exports = { User, Favs, Serie };
