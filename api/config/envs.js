require("dotenv").config();

module.exports = {
  // Base de datos
  DB_HOST: process.env.DB_HOST || "tmdb",

  // Servidor
  PORT: process.env.SERVER_PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || "development",

  // JWT Secret (NO valor por defecto - debe estar en .env)
  SECRET: process.env.SECRET,

  // TMDB API
  API_URL: process.env.API_URL || "https://api.themoviedb.org/3",
  API_KEY: process.env.API_KEY, // NO valor por defecto - debe estar en .env

  // Email SMTP
  HOST_MAILER: process.env.HOST_MAILER || "smtp.gmail.com",
  SMTP_PORT: process.env.SMTP_PORT || 465,
  SMTP_USER: process.env.SMTP_USER, // NO valor por defecto - debe estar en .env
  SMTP_PASSWORD: process.env.SMTP_PASSWORD, // NO valor por defecto - debe estar en .env

  // Frontend URL (para emails)
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
};
