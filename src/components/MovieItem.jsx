import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import "../styles/item.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import ConfirmModal from "../commons/ConfirmModal";

const MovieItem = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const user = useSelector((state) => state.user);
  const favoritos = useSelector((state) => state.favoritos);
  console.log("FAVORITOS DEL USUARIO:", favoritos);
  const userId = user.id;
  const [film, setFilm] = useState({});
  // const id = useParams().id;
  const { id } = useParams();
  const navigate = useNavigate();
  //EL ESTADO PARA LOS BOTONES
  const [eliminar, setEliminar] = useState(false);
  // useEffect(() => {
  //   if (favoritos) {
  //     setEliminar(true);
  //   }
  // }, [eliminar]);

  //BOTON DEL DELETE
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/api/favs/eliminar/${id}`)
      .then(() => {
        toast.success("SE HA ELIMINADO LA PELÍCULA");
        setShowConfirmModal(false);
        navigate("/favoritos");
      })
      .catch((error) => toast.error("NO SE HA PODIDO ELIMINAR LA PROPIEDAD"));
  };

  const confirmarEliminacion = () => {
    setShowConfirmModal(true);
  };

  const handleClose = () => {
    setShowConfirmModal(false);
  };

  //Handle para registrar favoritos
  const handleClick = (e) => {
    e.preventDefault();
    if (!user.id) {
      toast.warn("Necesitas estar logueado para agregar a favoritos");
    }

    axios
      .post("/api/favs/register", {
        prospectId: userId,
        movieId: id,
      })

      .then((result) => {
        if (result) {
          toast.success("AGREGADO A FAVORITOS");
        } else {
          toast.warn("Hubo un error");
        }
      })
      .catch(() => {
        toast.error("HA OCURRIDO UN ERROR VUELVE A INTENTARLO");
      });
  };
  //console.log(favoritos[0].id, "este es el favId!!!!");

  console.log("este es el resultadooo!!!!!", id);

  //Renderizamos la pelicula
  useEffect(() => {
    if (id)
      axios
        .get(`/api/users/movies/${id}`)
        .then((res) => res.data)
        .then((peli) => setFilm(peli))
        .catch((error) => console.log(error));

    // .then((response) => {
    //   console.log("buscando el ID!!!!!!", response.data);
    //   setFilm(response.data);
    // });
  }, [id]);

  useEffect(() => {
    // Verificar si la película está en favoritos
    if (
      Array.isArray(favoritos) &&
      favoritos.some((fav) => fav.id === parseInt(id))
    ) {
      setEliminar(true);
    } else {
      setEliminar(false);
    }
  }, [favoritos, id]);

  console.log("Film", film);

  return (
    <>
      <Navbar />
      <div className="container  text-center">
        <h1>{film.original_title}</h1>
        <p className="detalle">Detalles:{film.overview}</p>
        <p className="detalle">Fecha de Estreno: {film.release_date}</p>
        <div className="d-flex justify-content-center mb-4">
          <div className="card-body">
            <figure className="image imagenIndividual">
              <img
                src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                alt="Poster"
                className="card-img-top img-fluid-individual"
              />
            </figure>
          </div>
        </div>
        <div className="card-text">
          {/* LA CONDICION */}
          {eliminar ? (
            <Button
              variant="outline-primary boton-fav"
              onClick={confirmarEliminacion}
            >
              <i className="fa-solid fa-trash-can">Eliminar de favoritos</i>
            </Button>
          ) : (
            <Button onClick={handleClick} className="outline-primary boton-fav">
              <i className="bi bi-heart-fill"> Agregar a favoritos</i>
            </Button>
          )}
        </div>
        {showConfirmModal && (
          <ConfirmModal
            show={showConfirmModal}
            onHide={handleClose}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </>
  );
};
export default MovieItem;
