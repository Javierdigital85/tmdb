import React from "react";
import "../styles/contenido.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "../commons/Grid";
import Navbar from "./Navbar";
import FilterSideBar from "./FilterSideBar";

// import { useParams } from "react-router"; // Importa el hook useParams

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "a9dccccd77d6bf4e52b46cbd40148267";

const TredingMovies = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(1);
  const handlePaginationNext = () => {
    setPagination(pagination + 1);
  };
  const handlePaginationPrevious = () => {
    setPagination(pagination - 1);
  };

  // const { type } = useParams(); // Obtiene 'type' de los parámetros de la URL

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
        console.log("xxxxxxxxxxxx", res.data);
      })
      .catch((error) => console.log("ERROR"));
  }, [pagination]);
  return (
    <>
      <Navbar />
      <h1>Trending Movies</h1>
      <FilterSideBar />
      <nav aria-label="..." className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="btn btn-secondary ml-1"
              style={{ width: "150px" }}
              onClick={handlePaginationPrevious}
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

      <Grid collection={data} />

      <nav aria-label="..." className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="btn btn-secondary ml-1"
              style={{ width: "150px" }}
              onClick={handlePaginationPrevious}
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
    </>
  );
};

export default TredingMovies;
