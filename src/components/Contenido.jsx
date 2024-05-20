import React from "react";
import "../styles/contenido.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "../commons/Grid";
import Navbar from "./Navbar";
import FilterSideBar from "./FilterSideBar";
// import SwiperPeople from "../commons/SwiperPeople";

// import { useParams } from "react-router"; // Importa el hook useParams

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "a9dccccd77d6bf4e52b46cbd40148267";

const Contenido = () => {
  const [data, setData] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [pagination, setPagination] = useState(1);

  const handlePaginationNext = () => {
    setPagination(pagination + 1);
  };
  const handlePaginationPrevious = () => {
    setPagination(pagination - 1);
  };

  // const { type } = useParams(); // Obtiene 'type' de los parámetros de la URL

  useEffect(() => {
    //useEffect recibe una funcion
    axios //   /api/movies
      // .get(`${API_URL}person/popular?api_key=${API_KEY}&page=${pagination}`)
      .get(`${API_URL}discover/movie?api_key=${API_KEY}&page=${pagination}`)
      .then((res) => {
        setData(res.data.results);
        console.log("xxxxxxxxxxxx res", res);
        console.log("xxxxxxxxxxxx res.data", res.data);
        console.log(
          "este es el res.data.results de peliculas",
          res.data.results
        );
      })
      .catch((error) => console.log("error en la solicitud del axios", error));
  }, [pagination]); //tambien useEffect recibe un arreglo de dependencias o de valores
  // console.log("xxxxxxxxxxxxxxxx", data);

  // useEffect(() => {
  //   //useEffect recibe una funcion
  //   axios //   /api/movies
  //     .get(`${API_URL}person/popular?api_key=${API_KEY}`)
  //     .then((res) => {
  //       setPersonas(res.data.results);
  //       console.log("xxxxxxxxxxxx resPeople", res);
  //       console.log("xxxxxxxxxxxx res.data.people", res.data);
  //       console.log("este es el res.data.results de people", res.data.results);
  //     })
  //     .catch((error) => console.log("error en la solicitud del axios", error));
  // }, []); //tambien useEffect recibe un arreglo de dependencias o de valores
  // // console.log("xxxxxxxxxxxxxxxx", data);

  return (
    <>
      <Navbar />
      {/* <SwiperPeople people={personas} /> */}
      {/* <FilterSideBar /> */}

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

export default Contenido;
