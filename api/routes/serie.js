const express = require("express");
const serieRouter = express.Router();
const Serie = require("../models/Serie");
const axios = require("axios");
const envs = require("../config/envs");
const apiURL = envs.API_URL;
const apiKey = envs.API_KEY;

serieRouter.post("/register", (req, res) => {
  const { userId, serieId } = req.body;
  Serie.findOrCreate({
    where: { userId, serieId },
    defaults: { userId },
  })
    .then(([serie, created]) => {
      if (created) return res.status(201).send(serie);
      res.status(200).send(serie);
    })
    .catch((error) => console.log(error));
});

serieRouter.get("/favseries", (req, res) => {
  // Backend: Utiliza req.query para acceder a los datos enviados en la URL.
  //  entonces req.query será { prospectId: '123' }.
  console.log("ESTA ES LA QUERY", req.query);
  Serie.findAll({ where: req.query })
    .then((favRes) => {
      const array = favRes.map((serie) => {
        return serie.serieId;
      });
      console.log("HOLLAAAA", array);

      const promesas = array.map((id) => {
        return axios.get(`${apiURL}/tv/${id}`, {
          params: { api_key: apiKey },
        });
      });
      console.log("PROMESAS", promesas);
      return Promise.all(promesas);
    })
    .then((result) => {
      return result.map((serie) => {
        return serie.data;
      });
    })
    .then((findandresult) => {
      res.status(200).json(findandresult);
    })
    .catch((error) => {
      console.error("Error al obtener favoritos:", error);
      res.status(500).send("Error interno del servidor");
    });
});

serieRouter.delete("/eliminar/:id", (req, res) => {
  console.log("buscado req para delete", req.params);
  Serie.destroy({
    where: {
      serieId: req.params.id,
    },
  })
    .then(() => {
      res.sendStatus(202);
    })
    .catch((error) => {
      console.log("No se ha podido eliminar", error);
    });
});

module.exports = serieRouter;
