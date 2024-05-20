const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Serie extends Model {}

Serie.init(
  {
    serieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "favserie" }
);

module.exports = Serie;
