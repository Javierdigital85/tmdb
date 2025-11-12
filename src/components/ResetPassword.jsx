import React, { useState } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  // Obtener el token de la URL (viene en el parámetro :id de la ruta)
  const { id } = useParams();
  const token = id || "";

  console.log("🔑 Token recibido en frontend:", token);

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

    // Resetear mensajes de error
    setMessageError(false);
    setMessageErrorDos(false);

    // Validar que las contraseñas coincidan
    if (passUpdate.password !== passUpdate.passwordRepeat) {
      console.log("❌ Las contraseñas no coinciden");
      errorHandler();
      return;
    }

    // Validar que los campos no estén vacíos
    if (!passUpdate.password.trim() || !passUpdate.passwordRepeat.trim()) {
      console.log("❌ Los campos están vacíos");
      errorHandlerDos();
      return;
    }

    // Validar que haya un token
    if (!token) {
      toast.error(
        "Token inválido. Por favor, solicita un nuevo enlace de recuperación."
      );
      return;
    }

    // Enviar la nueva contraseña al backend
    console.log("📤 Enviando request a:", `/api/users/reset/${token}`);
    console.log("🔒 Con password:", passUpdate.password ? "✅" : "❌");

    axios
      .post(`/api/users/reset/${token}`, { password: passUpdate.password })
      .then((res) => {
        console.log("✅ Contraseña actualizada exitosamente:", res.data);
        toast.success("Contraseña actualizada exitosamente");
        acceptHandler();

        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log("❌ Error completo:", error);
        console.log("❌ Error response:", error.response);
        console.log("❌ Error status:", error.response?.status);
        console.log("❌ Error data:", error.response?.data);

        if (error.response && error.response.status === 404) {
          toast.error(
            "Token inválido o expirado. Por favor, solicita un nuevo enlace."
          );
        } else if (error.response && error.response.status === 400) {
          toast.error(error.response.data);
        } else {
          toast.error(
            `Error al actualizar la contraseña: ${
              error.response?.data || error.message
            }`
          );
        }
      });
  };
  return (
    <div className="vista-login">
      <Navbar />
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
