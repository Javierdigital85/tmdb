import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/item.css";
import { useSelector, useDispatch } from "react-redux";
import { setSerieFavoritos } from "../redux/serieFavs";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import ConfirmModal from "../commons/ConfirmModal";

function SerieItem() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const serieFavoritos = useSelector((state) => state.serieFavoritos);

  // DEBUG: Verificar estado del usuario
  console.log("🔍 DEBUG SERIE - Usuario completo:", user);
  console.log("🔍 DEBUG SERIE - user.id:", user?.id);
  console.log("🔍 DEBUG SERIE - ¿Usuario logueado?:", !!user?.id);
  console.log("SERIE FAVORITOS DEL USUARIO:", serieFavoritos);

  const userId = user?.id;
  const [serie, setSerie] = useState({});
  const [trailerKey, setTrailerKey] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [eliminar, setEliminar] = useState(false);

  // Scroll to top cuando se carga el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //BOTON DEL DELETE
  const handleDelete = (e) => {
    e.preventDefault();

    // Verificar que el usuario esté logueado (validación robusta)
    console.log("🔒 SERIE handleDelete - Verificando usuario:", user);
    console.log("🔒 SERIE handleDelete - user?.id:", user?.id);

    if (!user || !user.id || user.id === null || user.id === undefined) {
      console.log(
        "❌ SERIE handleDelete - Usuario NO logueado, bloqueando eliminación"
      );
      toast.error("Necesitas estar logueado para eliminar de favoritos");
      setShowConfirmModal(false);
      return;
    }

    console.log(
      "✅ SERIE handleDelete - Usuario logueado, procediendo con eliminación"
    );
    axios
      .delete(`/api/serie/eliminar/${id}`)
      .then(() => {
        toast.success("SE HA ELIMINADO LA SERIE");
        setShowConfirmModal(false);
        navigate("/seriefavoritos");
      })
      .catch((error) => toast.error("NO SE HA PODIDO ELIMINAR LA SERIE"));
  };

  const confirmarEliminacion = () => {
    // Verificar que el usuario esté logueado (validación robusta)
    console.log("🔒 SERIE confirmarEliminacion - Verificando usuario:", user);
    console.log("🔒 SERIE confirmarEliminacion - user?.id:", user?.id);

    if (!user || !user.id || user.id === null || user.id === undefined) {
      console.log(
        "❌ SERIE confirmarEliminacion - Usuario NO logueado, bloqueando modal"
      );
      toast.error("Necesitas estar logueado para eliminar de favoritos");
      return;
    }

    console.log(
      "✅ SERIE confirmarEliminacion - Usuario logueado, mostrando modal"
    );
    setShowConfirmModal(true);
  };

  const handleClose = () => {
    setShowConfirmModal(false);
  };

  //Handle para registrar favoritos
  const handleClick = (e) => {
    e.preventDefault();

    // Verificar que el usuario esté logueado (validación robusta)
    console.log("🔒 SERIE handleClick - Verificando usuario:", user);
    console.log("🔒 SERIE handleClick - user?.id:", user?.id);

    if (!user || !user.id || user.id === null || user.id === undefined) {
      console.log(
        "❌ SERIE handleClick - Usuario NO logueado, bloqueando agregar"
      );
      toast.error("Necesitas estar logueado para agregar a favoritos");
      return;
    }

    console.log(
      "✅ SERIE handleClick - Usuario logueado, agregando a favoritos"
    );
    axios
      .post("/api/serie/register", {
        prospectId: userId,
        serieId: id,
      })
      .then((result) => {
        if (result) {
          toast.success("AGREGADO A FAVORITOS");
          // Actualizar el estado de Redux después de agregar
          axios
            .get("/api/serie/favseries", {
              params: { prospectId: userId },
            })
            .then((res) => res.data)
            .then((data) => {
              console.log("Serie favoritos actualizados:", data);
              dispatch(setSerieFavoritos(data));
            })
            .catch((error) =>
              console.log("Error al actualizar serie favoritos:", error)
            );
        } else {
          toast.warn("Hubo un error");
        }
      })
      .catch(() => {
        toast.error("HA OCURRIDO UN ERROR VUELVE A INTENTARLO");
      });
  };

  //Renderizamos la serie
  useEffect(() => {
    if (id)
      axios
        .get(`/api/users/series/${id}`)
        .then((response) => {
          setSerie(response.data);
        })
        .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    // Verificar si la serie está en favoritos
    if (
      Array.isArray(serieFavoritos) &&
      serieFavoritos.some((fav) => fav.id === parseInt(id))
    ) {
      setEliminar(true);
    } else {
      setEliminar(false);
    }
  }, [serieFavoritos, id]);

  // Cargar trailer de la serie (idioma original, mejor calidad)
  useEffect(() => {
    if (id) {
      const API_KEY = "a9dccccd77d6bf4e52b46cbd40148267";
      axios
        .get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`)
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
            console.log(
              "Trailer de serie encontrado (idioma original):",
              trailer.key
            );
          }
        })
        .catch((error) => console.log("Error al cargar trailer:", error));
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="movie-detail-container">
        <div className="movie-detail-content">
          {/* Poster de la serie */}
          <div className="movie-poster-section">
            <img
              src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
              alt={serie.title || serie.name}
              className="movie-poster-img"
            />
          </div>

          {/* Información de la serie */}
          <div className="movie-info-section">
            <h1 className="movie-title">{serie.title || serie.name}</h1>

            {/* Fecha de estreno y rating */}
            <div className="movie-meta">
              {(serie.first_air_date || serie.release_date) && (
                <div className="meta-item">
                  <i className="bi bi-calendar3"></i>
                  <span>
                    {new Date(
                      serie.first_air_date || serie.release_date
                    ).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {serie.vote_average && (
                <div className="meta-item">
                  <i className="bi bi-star-fill"></i>
                  <span>{serie.vote_average.toFixed(1)}/10</span>
                </div>
              )}
              {serie.number_of_seasons && (
                <div className="meta-item">
                  <i className="bi bi-collection-play"></i>
                  <span>
                    {serie.number_of_seasons}{" "}
                    {serie.number_of_seasons === 1 ? "Temporada" : "Temporadas"}
                  </span>
                </div>
              )}
              {serie.number_of_episodes && (
                <div className="meta-item">
                  <i className="bi bi-film"></i>
                  <span>{serie.number_of_episodes} Episodios</span>
                </div>
              )}
            </div>

            {/* Géneros */}
            {serie.genres && serie.genres.length > 0 && (
              <div className="movie-genres">
                {serie.genres.map((genre) => (
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
                {serie.overview || "No hay descripción disponible."}
              </p>
            </div>

            {/* Botón de favoritos - Solo visible si está logueado (validación robusta) */}
            {user && user.id && user.id !== null && user.id !== undefined ? (
              <div className="movie-actions">
                {console.log(
                  "✅ SERIE Renderizando botones de favoritos - Usuario logueado"
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
                  "⚠️ SERIE Renderizando mensaje de login - Usuario NO logueado"
                )}
                <i className="bi bi-info-circle"></i>
                <span>Inicia sesión para agregar a favoritos</span>
              </div>
            )}
          </div>
        </div>

        {/* Trailer de la serie - Ancho completo */}
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
}

export default SerieItem;
