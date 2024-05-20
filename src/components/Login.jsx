import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user";
import Navbar from "./Navbar";
import "../styles/login.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "/api/users/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setUser(res.data));
        console.log(res, "este es el res de Login");
        console.log(res.data, "este es el res.data de Login");
      })
      .then(() => {
        setPassword("");
        setEmail("");
      })
      .then(() => {
        toast.success("INICIASTE SESIÓN");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="vista-login">
      <Navbar />
      <ToastContainer />
      <div className="estiloLogin">
        <form onSubmit={handleLogin} className="formLogin">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={handleChangeEmail}
              placeholder="Ingrese su correo electrónico"
              id="floatingInput"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handleChangePassword}
              placeholder="Ingrese su contraseña"
              id="floatingPassword"
            />
          </div>

          <div className="">
            <button type="submit" className="btn btn-primary  mx-2">
              Inicia Sesión
            </button>
          </div>
          <p className="forgot-password text-right">
            <Link to={"/forgot"} className="link">
              ¿Olvidaste tu contraseña?{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
