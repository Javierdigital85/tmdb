import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/filter.css";
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "a9dccccd77d6bf4e52b46cbd40148267";

function FilterSideBar() {
  const [selectedYear, setSelectedYear] = useState("");
  const [uniqueValues, setUniqueValues] = useState({ year: [] });
  const [movie, setMovie] = useState([]);
  const [filter, setFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(`${API_URL}discover/movie?api_key=${API_KEY}`)
      .then((res) => {
        // Extraer el año de la propiedad "release_date"
        const moviesWithReleaseYear = res.data.results.map((movie) => ({
          ...movie,
          releaseYear: new Date(movie.release_date).getFullYear(),
        }));
        // Eliminar duplicados usando Set y convertir nuevamente a un array
        const uniqueYears = [
          ...new Set(moviesWithReleaseYear.map((movie) => movie.releaseYear)),
        ];
        // Guardar en el estado
        setMovie(moviesWithReleaseYear);
        setUniqueValues({ ...uniqueValues, year: uniqueYears });
      })
      .catch((error) => console.log("ERROR"));
  }, []);

  const handleFilter = () => {
    setFilter(!filter);
  };

  const handleSearchParams = (e) => {
    const { name, value } = e.target;

    if (value !== "") {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      setSearchParams(params);
      if (name === "year") {
        setSelectedYear(value);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si se seleccionó un año
    if (selectedYear !== "") {
      axios
        .get(`${API_URL}discover/movie`, {
          params: {
            api_key: API_KEY,
            ...searchParams, // Agrega los demás parámetros de búsqueda
            year: selectedYear,
          },
        })
        .then((res) => {
          setMovie(res.data.results);
          console.log("Películas filtradas por año:", res.data.results);
        })
        .catch((error) => console.log("ERROR"));
    }
  };

  return (
    <>
      <div className="filter-side-bar">
        <button onClick={handleFilter} className="filtro">
          Filter
        </button>
        {filter && (
          <form onSubmit={handleSubmit} className="form-filter">
            <br />
            <select
              name="movie"
              id="movie"
              className="for-select form-select-md mb-3"
              onChange={handleSearchParams}
            >
              <option value="" id="optionName" disabled selected>
                Movie
              </option>
              {uniqueValues.movie &&
                uniqueValues.movie.map((movie, i) => (
                  <option key={i} value={movie}>
                    {movie}
                  </option>
                ))}
            </select>
            <br />

            <select
              name="year"
              id="year"
              className="for-select form-select-md mb-3"
              onChange={handleSearchParams}
            >
              <option value="" id="optionName" disabled selected>
                Año
              </option>
              {uniqueValues.year &&
                uniqueValues.year.map((year, i) => (
                  <option key={i} value={year}>
                    {year}
                  </option>
                ))}
            </select>
            <br />

            <button type="submit">APLICAR FILTROS</button>
          </form>
        )}
      </div>
    </>
  );
}

export default FilterSideBar;
