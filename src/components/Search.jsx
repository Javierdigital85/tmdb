import axios from "axios";
import React, { useState, useEffect } from "react";
import UserCard from "../commons/UserCard";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/search.css";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "a9dccccd77d6bf4e52b46cbd40148267";

export default function Search() {
  //se inicializan dos estados utilizando el hook useState
  const [search, setSearch] = useState(""); //search para almacenar el valor de la busqueda
  const [searchResult, setSearchResult] = useState([]); //searchResult para almacenar los resultados de la busqueda
  const [popularMovies, setPopularMovies] = useState([]); //películas populares para mostrar inicialmente
  const [hasSearched, setHasSearched] = useState(false); //para saber si el usuario ya buscó algo

  // Cargar películas populares al montar el componente
  useEffect(() => {
    axios
      .get(`${API_URL}movie/popular`, {
        params: { api_key: API_KEY },
      })
      .then((res) => {
        setPopularMovies(res.data.results);
        console.log("Películas populares cargadas:", res.data.results);
      })
      .catch((error) =>
        console.log("Error al cargar películas populares:", error)
      );
  }, []);

  // Búsqueda automática mientras escribes (con debounce)
  useEffect(() => {
    // Si el campo está vacío, volver a mostrar películas populares
    if (search.trim() === "") {
      setHasSearched(false);
      setSearchResult([]);
      return;
    }

    // Debounce: esperar 500ms después de que el usuario deje de escribir
    const timeoutId = setTimeout(() => {
      setHasSearched(true);
      axios
        .post("/api/users/search/", { search: search })
        .then((res) => res.data)
        .then((data) => {
          setSearchResult(data.results);
          console.log("Resultados de búsqueda:", data.results);
        })
        .catch((error) => console.log("Error en búsqueda:", error));
    }, 500);

    // Limpiar el timeout si el usuario sigue escribiendo
    return () => clearTimeout(timeoutId);
  }, [search]);

  //MANEJO DE CAMBIOS EN LA BUSQUEDA
  //define una funcion para menejar cambios en el input de busqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  //MANEJO DE ENVIOS DE BUSQUEDA
  //Prevenir el submit del formulario (ya no es necesario porque busca automáticamente)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  // Determinar qué películas mostrar
  const moviesToDisplay = hasSearched ? searchResult : popularMovies;

  //RENDERIZADO DEL FORMULARIO DE BUSQUEDA
  //Renderiza un formulario de búsqueda con un campo de entrada y un botón.
  return (
    <div>
      <Navbar />
      <div className="background">
        <form
          className="searchmovies-form"
          role="search"
          onSubmit={handleSearchSubmit}
        >
          <div className="search-box">
            <i className="bi bi-search search-icon-left"></i>
            <input
              value={search}
              className="search-input-modern"
              type="text"
              placeholder="Buscar películas..."
              onChange={handleSearchChange}
            />
          </div>
        </form>

        {/* Mensaje de bienvenida cuando no se ha buscado nada */}
        {!hasSearched && (
          <div className="welcome-message text-center text-white">
            <h2>
              <i className="bi bi-search me-2"></i>
              Busca tus películas favoritas
            </h2>
            <p className="lead">
              Explora millones de películas. Escribe el nombre de una película
              en el buscador.
            </p>
            <h4>
              <i className="bi bi-fire me-2"></i>
              Películas Populares
            </h4>
          </div>
        )}

        {/* Mostrar resultados de búsqueda o películas populares */}
        <div className="container">
          <div className="row">
            {moviesToDisplay.length > 0 ? (
              moviesToDisplay.map((data, i) => (
                <div className="col-md-4" key={i}>
                  <Link to={`movie/${data.id}`}>
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
