import axios from "axios";
import React, { useState } from "react";
import UserCard from "../commons/UserCard";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/search.css";

export default function Search() {
  //se inicializan dos estados utilizando el hook useState
  const [search, setSearch] = useState(""); //search para almacenar el valor de la busqueda
  const [searchResult, setSearchResult] = useState([]); //searchResult para almacenar los resultados de la busqueda

  //MANEJO DE CAMBIOS EN LA BUSQUEDA
  //define una funcion para menejar cambios en el input de busqueda
  const handleSearchChange = (e) => {
    console.log("soy EEEEEEEEEE", e);
    console.log("soy TARGETTTT", e.target);
    console.log("soy VALUEEEE", e.target.value);
    setSearch(e.target.value); //e.target.value accede al valor actual del input, es decir, el texto que el usuario ha ingresado.
    //setSearch es la función proporcionada por el hook useState que se utiliza para actualizar el estado de search.
  };

  //MANEJO DE ENVIOS DE BUSQUEDA
  //Define una función para manejar el envío del formulario de búsqueda.
  //Utiliza axios para hacer una solicitud POST a "/api/search/" con el valor de búsqueda.
  //Actualiza el estado searchResult con los resultados de la búsqueda o maneja errores.
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/search/", { search: search })
      // .get("/api/search/", { params: { query: search } })
      .then((res) => res.data)
      .then((search) => setSearchResult(search.results))
      .catch((error) => console.log("error"));
  };
  // console.log(searchResult);

  //RENDERIZADO DEL FORMULARIO DE BUSQUEDA
  //Renderiza un formulario de búsqueda con un campo de entrada y un botón.
  return (
    <div>
      <Navbar />
      <div className="background">
        <form
          class="d-flex"
          role="search"
          onSubmit={handleSearchSubmit}
          className="searchmovies
      "
        >
          <input
            value={search}
            class="form-control me-2"
            type="search"
            placeholder="Search"
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>

        {/* Aqui mapeamos todas las peliculas con map */}
        {/* Mapea los resultados de búsqueda y renderiza componentes UserCard dentro de enlaces (Link) que conducen a detalles de películas. */}
        <div className="container">
          <div className="row">
            {searchResult.map((data, i) => (
              <div className="col-md-4" key={i}>
                <Link to={`movie/${data.id}`}>
                  <UserCard dataUsecard={data} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
