const express = require("express");
const favsRouter = express.Router();
const Favs = require("../models/Favs");
const User = require("../models/User");
const axios = require("axios");
require("dotenv").config();
const apiURL = process.env.API_URL;
const apiKey = process.env.API_KEY;

favsRouter.post("/register", (req, res) => {
  const { prospectId, movieId } = req.body;
  Favs.findOrCreate({
    where: { prospectId, movieId },
    defaults: { prospectId },
  })
    .then(([user, created]) => {
      if (created) return res.status(201).send(created);
      res.status(200).send(created);
    })
    .catch((error) => console.log(error));
});

favsRouter.get("/favmovies", (req, res) => {
  console.log("ESTA ES LA QUERY", req.query);
  Favs.findAll({ where: req.query })
    .then((favRes) => {
      const array = favRes.map((movie) => {
        return movie.movieId;
      });
      console.log("HOLLAAAA", array);

      const promesas = array.map((id) => {
        return axios.get(`${apiURL}/movie/${id}`, {
          params: { api_key: apiKey },
        });
      });
      console.log("PROMESAS", promesas);
      return Promise.all(promesas);
    })
    .then((result) => {
      return result.map((movie) => {
        return movie.data;
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

favsRouter.delete("/eliminar/:id", (req, res) => {
  console.log("buscado req para delete", req.params);
  Favs.destroy({
    where: {
      movieId: req.params.id,
    },
  })
    .then(() => {
      res.sendStatus(202);
    })
    .catch((error) => {
      console.log("No se ha podido eliminar", error);
    });
});

module.exports = favsRouter;
