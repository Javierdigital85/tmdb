const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Favs extends Model {}

Favs.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "fav" }
);

module.exports = Favs;
