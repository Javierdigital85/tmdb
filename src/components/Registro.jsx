import React from "react";
import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/registro.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const userLog = useSelector((state) => state.user);
  // const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("estoy llegando al front!!!!");
    axios
      .post(
        "/api/users/register",
        {
          name: name,
          lastName: lastName,
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .then(() => {
        toast.success("SE HA REGISTRADO CON ÉXITO");
        navigate("/login");
      })
      //.then(() => navigate("/login"))
      .catch((error) => console.log("No se puedo registrar", error));

    // .then((user) => setUsers([...users, user]));
  };
  console.log("ESTOS SON LOS VALORES DE MI FORMULARIO!!!", name);
  return (
    <div className="vista-register">
      <Navbar />
      <ToastContainer />
      <div className="estiloRegister">
        <form onSubmit={handleSubmit} className="formRegister">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              value={name}
              type="name"
              className="form-control"
              onChange={handleChangeName}
              placeholder="Nombre"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Last name:{" "}
            </label>
            <input
              value={lastName}
              type="text"
              className="form-control"
              onChange={handleChangeLastName}
              placeholder="Lastname"
            />{" "}
          </div>

          <div className="mb-3">
            <label label htmlFor="email" className="form-label">
              Email:{" "}
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={handleChangeEmail}
              placeholder="E-mail"
            />
          </div>

          <div className="mb-3">
            <label label htmlFor="password" className="form-label">
              Password:{" "}
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handleChangePassword}
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
