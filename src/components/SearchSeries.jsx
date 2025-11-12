import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import UserCard from "../commons/UserCard";
import "../styles/searchseries.css";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "a9dccccd77d6bf4e52b46cbd40148267";

export default function SearchSeries() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Cargar series populares al montar el componente
  useEffect(() => {
    axios
      .get(`${API_URL}tv/popular`, {
        params: { api_key: API_KEY },
      })
      .then((res) => {
        setPopularSeries(res.data.results);
        console.log("Series populares cargadas:", res.data.results);
      })
      .catch((error) =>
        console.log("Error al cargar series populares:", error)
      );
  }, []);

  // Búsqueda automática mientras escribes (con debounce)
  useEffect(() => {
    // Si el campo está vacío, volver a mostrar series populares
    if (search.trim() === "") {
      setHasSearched(false);
      setSearchResult([]);
      return;
    }

    // Debounce: esperar 500ms después de que el usuario deje de escribir
    const timeoutId = setTimeout(() => {
      setHasSearched(true);
      axios
        .post("/api/users/series/search", { search: search })
        .then((res) => res.data)
        .then((data) => {
          setSearchResult(data.results);
          console.log("Resultados de búsqueda de series:", data.results);
        })
        .catch((error) => console.log("Error en búsqueda de series:", error));
    }, 500);

    // Limpiar el timeout si el usuario sigue escribiendo
    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  // Determinar qué series mostrar
  const seriesToDisplay = hasSearched ? searchResult : popularSeries;
  return (
    <div>
      <Navbar />
      <div className="backgroundseries">
        <form
          className="searchseries-form"
          role="search"
          onSubmit={handleSearchSubmit}
        >
          <div className="search-box">
            <i className="bi bi-search search-icon-left"></i>
            <input
              value={search}
              className="search-input-modern"
              type="text"
              placeholder="Buscar series..."
              onChange={handleSearch}
            />
          </div>
        </form>
        {/* Mensaje de bienvenida cuando no se ha buscado nada */}
        {!hasSearched && (
          <div className="welcome-message text-center text-white">
            <h2>
              <i className="bi bi-search me-2"></i>
              Busca tus series favoritas
            </h2>
            <p className="lead">
              Explora millones de series. Escribe el nombre de una serie en el
              buscador.
            </p>
            <h4>
              <i className="bi bi-fire me-2"></i>
              Series Populares
            </h4>
          </div>
        )}

        {/* Mostrar resultados de búsqueda o series populares */}
        <div className="container">
          <div className="row">
            {seriesToDisplay.length > 0 ? (
              seriesToDisplay.map((data, i) => (
                <div className="col-md-4" key={i}>
                  <Link to={`serie/${data.id}`}>
                    <UserCard dataUsecard={data} />
                  </Link>
                </div>
              ))
            ) : hasSearched ? (
              <div className="col-12 text-center text-white my-5">
                <h3>
                  <i className="bi bi-emoji-frown me-2"></i>
                  No se encontraron resultados para "{search}"
                </h3>
                <p className="lead">Intenta con otra búsqueda</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
