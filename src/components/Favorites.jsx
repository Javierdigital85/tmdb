import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Grid from "../commons/Grid";
import { useSelector } from "react-redux";
import "../styles/favoritos.css";

function Favorites() {
  const [favs, sertFavs] = useState([]);
  const user = useSelector((state) => state.user);
  const id = user.id;

  useEffect(() => {
    if (id) {
      // Frontend: Utiliza params para enviar datos en la URL.
      axios
        .get(
          "/api/favs/favmovies",
          {
            params: { prospectId: id },
          },
          // Aquí, prospectId se incluirá en la URL como /api/favs/?prospectId=id.
          {
            withCredentials: true,
          }
        )
        .then((res) => sertFavs(res.data))
        .catch((error) => ("Error al obtener favoritos", error));
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <h1 className="favTitulo">Favourites Movies</h1>
      <Grid collection={favs} />
    </>
  );
}

export default Favorites;
