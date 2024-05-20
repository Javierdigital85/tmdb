import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/useridentification.css";
import NavbarAdmin from "../commons/NavbarAdmin";

function UserIdentification() {
  const { id } = useParams();
  console.log("ID DEL USSSSSSUARIO", id);
  const [user, setUser] = useState({});
  useEffect(() => {
    console.log("URL de la solicitudddddd:", `/api/users/${id}`);
    axios
      .get(`/api/users/${id}`)
      .then((res) => res.data)
      .then((users) => setUser(users))
      // .then((res) => setUser(res.data))
      .catch((error) => console.log("Detalle no encontrado", error));
  }, [id]);

  return (
    <>
      <NavbarAdmin />
      <h1>Información del Usuario</h1>
      <div className="user-icon-container imagenIcono">
        <img
          src={
            "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
          }
          class="card-img-top"
          alt="..."
        ></img>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Nombre: {user.name} </li>
            <li className="list-group-item">Apelido: {user.lastName} </li>
            <li className="list-group-item">E-mail: {user.email}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserIdentification;
