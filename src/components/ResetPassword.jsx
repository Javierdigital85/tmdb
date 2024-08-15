import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { setUser } from "../redux/user";

// const user = useSelector((state) => state.user);
// const password = user.password;
const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const recover = useSelector((state) => state.recover);
  const { id } = useParams();
  // const [password, setPasssword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  const [passUpdate, setPassUpdate] = useState({
    password: "",
    passwordRepeat: "",
  });

  const [accept, setAccept] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [messageErrorDos, setMessageErrorDos] = useState(false);

  const errorHandler = () => {
    setMessageError(true);
  };
  const errorHandlerDos = () => {
    setMessageErrorDos(true);
  };
  const acceptHandler = () => {
    setAccept(true);
  };
  const handleChange = (e) => {
    setPassUpdate({
      ...passUpdate,
      [e.target.name]: e.target.value,
    });
  };

  // const handlePassword = (e) => {
  //   setPasssword(e.target.value);
  // };
  // const handleNewPassword = (e) => {
  //   setNewPassword(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passUpdate.password !== passUpdate.passwordRepeat) {
      console.log("No coinciden los passwords");
      errorHandler();
    } else if (
      !passUpdate.password.trim() &&
      !passUpdate.passwordRepeat.trim()
    ) {
      errorHandlerDos();
    } else {
      axios
        .post(
          `/api/users/reset/${id}`,

          { email: user.email, password: passUpdate.password },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(setUser(res.data));
          console.log("La solicitud PUT se hizo correctamente");
          toast.success("Contraseña Actualizada exitosamente");
          acceptHandler();
        })
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.log(error, "este es mi error");
        });
    }
  };
  return (
    <div className="vista-login">
      <Navbar />
      <ToastContainer />
      <div className="estiloLogin">
        <form className="formLogin" onSubmit={handleSubmit}>
          <h3>Forgot Password</h3>

          <div className="mb-3">
            <label label htmlFor="password" className="form-label">
              Password:{" "}
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={passUpdate.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div className="mb-3">
            <label label htmlFor="password" className="form-label">
              Confirm Password:{" "}
            </label>
            <input
              name="passwordRepeat"
              type="password"
              className="form-control"
              value={passUpdate.passwordRepeat}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div className="">
            <button type="submit" className="btn btn-primary  mx-2">
              Confirmar
            </button>
          </div>
          {messageError && (
            <p className="text-danger bg-red medium rounded">
              No coinciden las contraseñas
            </p>
          )}
          {messageErrorDos && (
            <p className="text-warning bg-dark rounded">
              Los campos deben ser completados
            </p>
          )}
          {accept && (
            <p className="text-success">
              Se ha cambiado el password con éxito.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
