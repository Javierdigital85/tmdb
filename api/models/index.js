//este archivo se usa para hacer las relaciones

const User = require("./User");
const Favs = require("./Favs");
const Serie = require("./Serie");

Favs.belongsTo(User, { as: "user", foreignKey: "userId" });
Serie.belongsTo(User, { as: "user", foreignKey: "userId" });

module.exports = { User, Favs, Serie };
