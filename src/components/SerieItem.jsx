import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import "../styles/item.css";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function SerieItem() {
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const [serie, setSerie] = useState({});
  const id = useParams().id;

  const handleClick = (e) => {
    e.preventDefault();
    if (!user.id) {
      toast.warn("Necesitas estar logueado para agregar a favoritos");
    }
    axios
      .post("/api/serie/register", {
        prospectId: userId,
        serieId: id,
      })
      .then((result) => {
        if (result) toast.success("AGREGADO A FAVORITOS");
        else {
          toast.warn("Hubo un error"); //este error se marca ej:si escribiste mal la url
        }
      })
      .catch(() => {
        toast.error("HA OCURRIDO UN ERROR VUELVE A INTENTARLO");
      });
  };

  useEffect(() => {
    axios.get(`/api/users/series/${id}`).then((response) => {
      setSerie(response.data);
    });
  }, [id]);

  return (
    <>
      <Navbar />
      <div class="container  text-center">
        <h1>{serie.title}</h1>
        <p>Detalle : {serie.overview}</p>
        <p>Fecha de Estreno: {serie.release_date}</p>
        <p>Idioma :{serie.original_language}</p>
        <div className="d-flex justify-content-center mb-4">
          <div className="card-body">
            <figure className="image imagenIndividual">
              <img
                src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                alt="Poster"
                className="card-img-top img-fluid-individual"
              />
            </figure>
          </div>
        </div>
        <div className="card-text">
          <button
            onClick={handleClick}
            className="btn btn-outline-primary boton-fav"
          >
            <i className="bi bi-heart-fill"> Agregar a favoritos</i>
          </button>
        </div>
      </div>
    </>
  );
}

export default SerieItem;
