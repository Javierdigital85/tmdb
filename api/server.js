// Configuración del server
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./db");
const { User, Favs, Serie } = require("./models");
const envs = require("./config/envs");
const authAPI = require("./routes");
const morgan = require("morgan");

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS - Configuración para desarrollo y producción
if (process.env.NODE_ENV === "production") {
  // Producción: Frontend y backend en el mismo dominio
  app.use(cors({ origin: true, credentials: true }));
} else {
  // Desarrollo: Permitir localhost:3000
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
}

app.use(morgan("tiny"));

// API Routes
app.use("/api", authAPI);

// Servir archivos estáticos del frontend en producción
if (process.env.NODE_ENV === "production") {
  // Servir archivos estáticos de React
  app.use(express.static(path.join(__dirname, "../build")));

  // Todas las rutas que no sean /api deben servir index.html
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  // En desarrollo, servir desde public (si existe)
  app.use(express.static(path.join(__dirname, "public")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

//Sincronizamos nuetro modelo hecho con Sequelize en el servidor
db.sync({ force: false }).then(() => {
  console.log("Db connected");
  console.log("__dirname:", __dirname);
  app.listen(envs.PORT, () => {
    console.log(`Server listening at port ${envs.PORT}`);
  });
});
//  app.listen(3001, () => {
// console.log(`Server listening at port ${3001}`);
//}
