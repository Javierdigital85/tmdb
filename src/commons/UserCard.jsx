import React from "react";
import "../styles/usercard.css";

//Estructura de cada Card
const UserCard = ({ dataUsecard }) => {
  return (
    <div className="movie-card-container" style={{ maxWidth: "380px" }}>
      <div className="card-body">
        <figure className="image">
          <img
            src={`https://image.tmdb.org/t/p/w500/${dataUsecard.poster_path}`}
            alt={dataUsecard.original_title || dataUsecard.name || "Poster"}
            className="card-img-top img-fluid"
          />
          <p className="title is-6">
            {dataUsecard.original_title || dataUsecard.name || "Sin título"}
          </p>
        </figure>
      </div>
    </div>
  );
};

export default UserCard;
