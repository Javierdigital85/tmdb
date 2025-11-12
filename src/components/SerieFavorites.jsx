import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Grid from "../commons/Grid";
import GridSeries from "../commons/GridSeries";
import "../styles/favoritos.css";

function SerieFavorites() {
  const [favs, setFavs] = useState([]);
  const user = useSelector((state) => state.user);
  const id = user.id;
  useEffect(() => {
    if (id) {
      axios
        .get(
          "/api/serie/favseries",
          {
            params: { userId: id },
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => setFavs(res.data))
        .catch((error) =>
          console.log("Error al obtener serie favoritos", error)
        );
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <h1 className="favTitulo">Favourites Series</h1>

      {favs.length > 0 ? (
        <GridSeries collection={favs} />
      ) : (
        <div className="empty-favorites">
          <div className="empty-favorites-content">
            <i className="bi bi-tv empty-favorites-icon"></i>
            <h2 className="empty-favorites-title">
              No tienes series favoritas aún
            </h2>
            <p className="empty-favorites-text">
              Descubre series increíbles y agrégalas a tus favoritos para verlas
              aquí
            </p>
            <Link
              to="/searchseries"
              className="btn btn-primary btn-lg empty-favorites-btn"
            >
              <i className="bi bi-search me-2"></i>
              Explorar Series
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default SerieFavorites;
