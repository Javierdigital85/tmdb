import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setFavoritos } from "../redux/favs";
import "../styles/item.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import ConfirmModal from "../commons/ConfirmModal";

const MovieItem = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favoritos = useSelector((state) => state.favoritos);

  // DEBUG: Verificar estado del usuario
  console.log("🔍 DEBUG - Usuario completo:", user);
  console.log("🔍 DEBUG - user.id:", user?.id);
  console.log("🔍 DEBUG - ¿Usuario logueado?:", !!user?.id);
  console.log("FAVORITOS DEL USUARIO:", favoritos);

  const userId = user?.id;
  const [film, setFilm] = useState({});
  const [trailerKey, setTrailerKey] = useState(null);
  // const id = useParams().id;
  const { id } = useParams();
  const navigate = useNavigate();
  //EL ESTADO PARA LOS BOTONES
  const [eliminar, setEliminar] = useState(false);

  // Scroll to top cuando se carga el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // useEffect(() => {
  //   if (favoritos) {
  //     setEliminar(true);
  //   }
  // }, [eliminar]);

  //BOTON DEL DELETE
  const handleDelete = (e) => {
    e.preventDefault();

    // Verificar que el usuario esté logueado (validación robusta)
    console.log("🔒 handleDelete - Verificando usuario:", user);
    console.log("🔒 handleDelete - user?.id:", user?.id);

    if (!user || !user.id || user.id === null || user.id === undefined) {
      console.log(
        "❌ handleDelete - Usuario NO logueado, bloqueando eliminación"
      );
      toast.error("Necesitas estar logueado para eliminar de favoritos");
      setShowConfirmModal(false);
      return;
    }

    console.log(
      "✅ handleDelete - Usuario logueado, procediendo con eliminación"
    );
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
    // Verificar que el usuario esté logueado (validación robusta)
    console.log("🔒 confirmarEliminacion - Verificando usuario:", user);
    console.log("🔒 confirmarEliminacion - user?.id:", user?.id);

    if (!user || !user.id || user.id === null || user.id === undefined) {
      console.log(
        "❌ confirmarEliminacion - Usuario NO logueado, bloqueando modal"
      );
      toast.error("Necesitas estar logueado para eliminar de favoritos");
      return;
    }

    console.log("✅ confirmarEliminacion - Usuario logueado, mostrando modal");
    setShowConfirmModal(true);
  };

  const handleClose = () => {
    setShowConfirmModal(false);
  };

  //Handle para registrar favoritos
  const handleClick = (e) => {
    e.preventDefault();

    // Verificar que el usuario esté logueado (validación robusta)
    console.log("🔒 handleClick - Verificando usuario:", user);
    console.log("🔒 handleClick - user?.id:", user?.id);

    if (!user || !user.id || user.id === null || user.id === undefined) {
      console.log("❌ handleClick - Usuario NO logueado, bloqueando agregar");
      toast.error("Necesitas estar logueado para agregar a favoritos");
      return;
    }

    console.log("✅ handleClick - Usuario logueado, agregando a favoritos");

    axios
      .post("/api/favs/register", {
        prospectId: userId,
        movieId: id,
      })
      .then((result) => {
        if (result) {
          toast.success("AGREGADO A FAVORITOS");
          // Actualizar el estado de Redux después de agregar
          axios
            .get("/api/favs/favmovies", {
              params: { prospectId: userId },
            })
            .then((res) => res.data)
            .then((data) => {
              console.log("Favoritos actualizados:", data);
              dispatch(setFavoritos(data));
            })
            .catch((error) =>
              console.log("Error al actualizar favoritos:", error)
            );
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
    console.log("Verificando favoritos:", favoritos);
    console.log("ID de película actual:", id);

    if (
      Array.isArray(favoritos) &&
      favoritos.some((fav) => fav.id === parseInt(id))
    ) {
      console.log("Película ESTÁ en favoritos - mostrando botón ELIMINAR");
      setEliminar(true);
    } else {
      console.log("Película NO está en favoritos - mostrando botón AGREGAR");
      setEliminar(false);
    }
  }, [favoritos, id]);

  // Cargar trailer de la película (idioma original, mejor calidad)
  useEffect(() => {
    if (id) {
      const API_KEY = "a9dccccd77d6bf4e52b46cbd40148267";
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        )
        .then((res) => {
          const videos = res.data.results;
          // Buscar trailer oficial en YouTube (idioma original)
          const trailer =
            videos.find(
              (video) =>
                video.type === "Trailer" &&
                video.site === "YouTube" &&
                video.official === true
            ) ||
            videos.find(
              (video) => video.type === "Trailer" && video.site === "YouTube"
            ) ||
            videos[0];

          if (trailer) {
            setTrailerKey(trailer.key);
            console.log("Trailer encontrado (idioma original):", trailer.key);
          }
        })
        .catch((error) => console.log("Error al cargar trailer:", error));
    }
  }, [id]);

  console.log("Film", film);

  return (
    <>
      <Navbar />
      <div className="movie-detail-container">
        <div className="movie-detail-content">
          {/* Poster de la película */}
          <div className="movie-poster-section">
            <img
              src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              alt={film.original_title}
              className="movie-poster-img"
            />
          </div>

          {/* Información de la película */}
          <div className="movie-info-section">
            <h1 className="movie-title">{film.original_title}</h1>

            {/* Fecha de estreno y rating */}
            <div className="movie-meta">
              {film.release_date && (
                <div className="meta-item">
                  <i className="bi bi-calendar3"></i>
                  <span>
                    {new Date(film.release_date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {film.vote_average && (
                <div className="meta-item">
                  <i className="bi bi-star-fill"></i>
                  <span>{film.vote_average.toFixed(1)}/10</span>
                </div>
              )}
              {film.runtime && (
                <div className="meta-item">
                  <i className="bi bi-clock"></i>
                  <span>{film.runtime} min</span>
                </div>
              )}
            </div>

            {/* Géneros */}
            {film.genres && film.genres.length > 0 && (
              <div className="movie-genres">
                {film.genres.map((genre) => (
                  <span key={genre.id} className="genre-badge">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Sinopsis */}
            <div className="movie-overview-section">
              <h3 className="section-title">Sinopsis</h3>
              <p className="movie-overview">
                {film.overview || "No hay descripción disponible."}
              </p>
            </div>

            {/* Botón de favoritos - Solo visible si está logueado (validación robusta) */}
            {user && user.id && user.id !== null && user.id !== undefined ? (
              <div className="movie-actions">
                {console.log(
                  "✅ Renderizando botones de favoritos - Usuario logueado"
                )}
                {eliminar ? (
                  <Button
                    variant="danger"
                    className="btn-favorite btn-remove"
                    onClick={confirmarEliminacion}
                  >
                    <i className="bi bi-trash3-fill"></i>
                    Eliminar de favoritos
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="btn-favorite btn-add"
                    onClick={handleClick}
                  >
                    <i className="bi bi-heart-fill"></i>
                    Agregar a favoritos
                  </Button>
                )}
              </div>
            ) : (
              <div className="login-message">
                {console.log(
                  "⚠️ Renderizando mensaje de login - Usuario NO logueado"
                )}
                <i className="bi bi-info-circle"></i>
                <span>Inicia sesión para agregar a favoritos</span>
              </div>
            )}
          </div>
        </div>
        {/* SI trailerKey tiene un valor (truthy) ENTONCES renderiza el div con el trailer. 
        SI NO (trailerKey es null/undefined/false)NO renderiza nada */}
        {/* Trailer de la película - Ancho completo */}
        {trailerKey && (
          <div className="movie-trailer-section">
            <h3 className="trailer-title">
              <i className="bi bi-play-circle-fill me-2"></i>
              Trailer Oficial
            </h3>
            <div className="trailer-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?vq=hd2160&rel=0&modestbranding=1&iv_load_policy=3`}
                title="Trailer Oficial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="trailer-iframe"
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {showConfirmModal && (
        <ConfirmModal
          show={showConfirmModal}
          onHide={handleClose}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default MovieItem;
