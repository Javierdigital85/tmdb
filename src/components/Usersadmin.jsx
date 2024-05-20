import React, { useEffect, useState } from "react";
import NavbarAdmin from "../commons/NavbarAdmin";
import axios from "axios";
import GridUsersAdmin from "../commons/GridUsersAdmin";
import "../styles/useradmin.css";
import SimpleTable from "../commons/SimpleTable";
import newData from "../MOCK_DATA.json";

function Usersadmin() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/api/users/allUsers")
      .then((res) => res.data)
      .then((users) => setUsers(users))
      .catch(() => "No se encontro los usuarios");
  }, []);

  return (
    <div className="tarjeta">
      <NavbarAdmin />
      <h1>Usuarios Registrados</h1>
      <SimpleTable data={users} />
      {/* <GridUsersAdmin data={users} /> */}
    </div>
  );
}

export default Usersadmin;
