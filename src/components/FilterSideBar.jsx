import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/filter.css";
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "a9dccccd77d6bf4e52b46cbd40148267";

function FilterSideBar({ onFilterApply }) {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [uniqueValues, setUniqueValues] = useState({ year: [], genres: [] });
  const [searchParams, setSearchParams] = useSearchParams();

  // Cargar años disponibles y géneros
  useEffect(() => {
    // Obtener años de películas
    axios
      .get(`${API_URL}discover/movie?api_key=${API_KEY}`)
      .then((res) => {
        const moviesWithReleaseYear = res.data.results.map((movie) => ({
          ...movie,
          releaseYear: new Date(movie.release_date).getFullYear(),
        }));
        const uniqueYears = [
          ...new Set(moviesWithReleaseYear.map((movie) => movie.releaseYear)),
        ].sort((a, b) => b - a); // Ordenar de más reciente a más antiguo

        setUniqueValues((prev) => ({ ...prev, year: uniqueYears }));
      })
      .catch((error) => console.log("ERROR al cargar años:", error));

    // Obtener géneros de películas
    axios
      .get(`${API_URL}genre/movie/list?api_key=${API_KEY}`)
      .then((res) => {
        setUniqueValues((prev) => ({ ...prev, genres: res.data.genres }));
      })
      .catch((error) => console.log("ERROR al cargar géneros:", error));
  }, []);

  const handleSearchParams = (e) => {
    const { name, value } = e.target;

    if (value !== "") {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      setSearchParams(params);

      if (name === "year") {
        setSelectedYear(value);
      } else if (name === "genre") {
        setSelectedGenre(value);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construir parámetros de filtro
    const filterParams = {
      api_key: API_KEY,
    };

    if (selectedYear !== "") {
      filterParams.year = selectedYear;
    }

    if (selectedGenre !== "") {
      filterParams.with_genres = selectedGenre;
    }

    // Hacer la petición con los filtros
    axios
      .get(`${API_URL}discover/movie`, {
        params: filterParams,
      })
      .then((res) => {
        console.log("Películas filtradas:", res.data.results);
        // Llamar a la función callback del componente padre
        if (onFilterApply) {
          onFilterApply(res.data.results);
        }
      })
      .catch((error) => console.log("ERROR al filtrar:", error));
  };

  const handleClearFilters = () => {
    setSelectedYear("");
    setSelectedGenre("");
    setSearchParams({});
    if (onFilterApply) {
      onFilterApply(null); // null indica que se deben mostrar las películas originales
    }
  };

  return (
    <>
      <div className="filter-side-bar container my-4">
        <div className="filter-container">
          <form
            onSubmit={handleSubmit}
            className="form-filter-horizontal p-3 shadow-lg rounded-4 bg-gradient-dark"
          >
            <div className="row g-3 align-items-end">
              {/* Género */}
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="filter-group">
                  <label
                    htmlFor="genre"
                    className="form-label text-white fw-bold mb-2"
                  >
                    <i className="bi bi-film me-2 text-warning"></i>
                    Género
                  </label>
                  <select
                    name="genre"
                    id="genre"
                    className="form-select custom-select shadow-sm"
                    onChange={handleSearchParams}
                    value={selectedGenre}
                  >
                    <option value="">🎬 Todos los géneros</option>
                    {uniqueValues.genres &&
                      uniqueValues.genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                          {genre.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Año */}
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="filter-group">
                  <label
                    htmlFor="year"
                    className="form-label text-white fw-bold mb-2"
                  >
                    <i className="bi bi-calendar-event me-2 text-info"></i>
                    Año
                  </label>
                  <select
                    name="year"
                    id="year"
                    className="form-select custom-select shadow-sm"
                    onChange={handleSearchParams}
                    value={selectedYear}
                  >
                    <option value="">📅 Todos los años</option>
                    {uniqueValues.year &&
                      uniqueValues.year.map((year, i) => (
                        <option key={i} value={year}>
                          {year}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Botones */}
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-success shadow-sm btn-hover-effect w-50"
                  >
                    <i className="bi bi-check-circle-fill me-1"></i>
                    Aplicar
                  </button>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="btn btn-outline-light shadow-sm btn-hover-effect w-50"
                  >
                    <i className="bi bi-arrow-counterclockwise me-1"></i>
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FilterSideBar;
