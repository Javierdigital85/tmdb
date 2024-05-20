import React, { useEffect, useState } from "react";
import "../styles/usercard.css";
import { useSelector } from "react-redux";

//Estructura de cada Card
// escribir profile-path
const UserCard = ({ dataUsecard }) => {
  // const favoritos = useSelector((state) => state.favoritos);
  // const favId = favoritos.id;
  // const [eliminar, setEliminar] = useState(false);
  // useEffect(() => {
  //   if (favId) {
  //     setEliminar(true);
  //   }
  // }, [favId]);
  return (
    <div className="" style={{ maxWidth: "380px" }}>
      <div className="card-body">
        <figure className="image">
          <img
            src={`https://image.tmdb.org/t/p/w300/${dataUsecard.poster_path}`}
            alt="Poster"
            className="card-img-top img-fluid"
          />
          <p className="title is-6">{dataUsecard.original_title}</p>
        </figure>
      </div>
      {/* {eliminar ? <p>Eliminar</p> : null} */}
      {/* <p>Eliminar</p> */}
    </div>
  );
};

export default UserCard;
