const Sequelize = require("sequelize");
require("dotenv").config();

const config = require("../config/envs");

// Usar DATABASE_URL si está disponible (Render/producción)
// Si no, usar configuración local
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Necesario para Render
        },
      },
      logging: false,
    })
  : new Sequelize(config.DB_HOST, null, null, {
      host: "localhost",
      dialect: "postgres",
      logging: false,
    });

module.exports = sequelize;
