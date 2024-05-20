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

app.use(express.static(path.resolve(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(morgan("tiny"));
//express Routing
app.use("/api", authAPI);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

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
