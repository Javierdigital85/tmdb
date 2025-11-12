import React from "react";
import "../styles/contenido.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "../commons/Grid";
import Navbar from "./Navbar";
import FilterSideBar from "./FilterSideBar";

// import { useParams } from "react-router"; // Importa el hook useParams

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "a9dccccd77d6bf4e52b46cbd40148267";

const TredingMovies = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [pagination, setPagination] = useState(1);

  const handlePaginationNext = () => {
    setPagination(pagination + 1);
  };

  const handlePaginationPrevious = () => {
    setPagination(pagination - 1);
  };

  const handleFilterApply = (filteredMovies) => {
    if (filteredMovies === null) {
      // Limpiar filtros - mostrar datos originales
      setFilteredData(null);
    } else {
      // Aplicar filtros
      setFilteredData(filteredMovies);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/trending/movie/day`, {
        params: {
          api_key: API_KEY,
          page: pagination,
        },
      })
      .then((res) => {
        setData(res.data.results);
        setOriginalData(res.data.results);
        console.log("xxxxxxxxxxxx", res.data);
      })
      .catch((error) => console.log("ERROR"));
  }, [pagination]);

  // Determinar qué datos mostrar
  const moviesToDisplay = filteredData !== null ? filteredData : data;
  return (
    <>
      <Navbar />
      <h1>Trending Movies</h1>
      <FilterSideBar onFilterApply={handleFilterApply} />

      {filteredData === null && (
        <nav aria-label="..." className="d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="btn btn-secondary ml-1"
                style={{ width: "150px" }}
                onClick={handlePaginationPrevious}
                disabled={pagination === 1}
              >
                Previous
              </button>
            </li>

            <li className="page-item">
              <button
                className="btn btn-primary ml-1"
                style={{ width: "150px" }}
                onClick={handlePaginationNext}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      <Grid collection={moviesToDisplay} />

      {filteredData === null && (
        <nav aria-label="..." className="d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="btn btn-secondary ml-1"
                style={{ width: "150px" }}
                onClick={handlePaginationPrevious}
                disabled={pagination === 1}
              >
                Previous
              </button>
            </li>

            <li className="page-item">
              <button
                className="btn btn-primary ml-1"
                style={{ width: "150px" }}
                onClick={handlePaginationNext}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default TredingMovies;
