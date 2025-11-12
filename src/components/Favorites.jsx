import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Grid from "../commons/Grid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
            params: { userId: id },
          },
          // Aquí, userId se incluirá en la URL como /api/favs/?userId=id.
          {
            withCredentials: true,
          }
        )
        .then((res) => sertFavs(res.data))
        .catch((error) => "Error al obtener favoritos");
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <h1 className="favTitulo">Favourites Movies</h1>

      {favs.length > 0 ? (
        <Grid collection={favs} />
      ) : (
        <div className="empty-favorites">
          <div className="empty-favorites-content">
            <i className="bi bi-heart empty-favorites-icon"></i>
            <h2 className="empty-favorites-title">
              No tienes películas favoritas aún
            </h2>
            <p className="empty-favorites-text">
              Explora nuestro catálogo y agrega tus películas favoritas para
              verlas aquí
            </p>
            <Link
              to="/search"
              className="btn btn-primary btn-lg empty-favorites-btn"
            >
              <i className="bi bi-search me-2"></i>
              Explorar Películas
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Favorites;
