import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
//import { ToastContainer, toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setErrorSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    // Limpiar errores cuando el usuario empieza a escribir
    setErrorSubmitted(false);
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpiar estados previos
    setErrorSubmitted(false);
    setEmailSubmitted(false);
    setErrorMessage("");

    // Validar que el email no esté vacío
    if (!email.trim()) {
      setErrorSubmitted(true);
      setErrorMessage("Debe ingresar su e-mail.");
      return;
    }

    console.log("📧 Enviando solicitud de recuperación para:", email);

    axios
      .put("/api/users/forgot", { email }, { returning: true })
      .then((res) => {
        if (res.status === 200) {
          console.log("✅ Email enviado exitosamente");
          setEmailSubmitted(true);
        }
      })
      .catch((error) => {
        console.log("❌ Error al enviar email:", error);
        setErrorSubmitted(true);
        if (error.response && error.response.status === 404) {
          setErrorMessage("El email no está registrado en el sistema.");
        } else {
          setErrorMessage("Ha ocurrido un error. Intenta nuevamente.");
        }
      });
  };

  return (
    <div className="vista-login">
      <Navbar />
      {/* <ToastContainer /> */}
      <div className="estiloLogin">
        <form onSubmit={handleSubmit} className="formLogin">
          <h3>Forgot Password</h3>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              value={email}
              type="email"
              className="form-control"
              onChange={handleEmail}
              placeholder="Ingrese su correo electrónico"
              id="floatingInput"
            />
          </div>
          <div className="">
            <button type="submit" className="btn btn-primary  mx-2">
              Enviar
            </button>
            {emailSubmitted && (
              <div className="text-success medium mt-2">
                <p className="mb-1">
                  ✅ Email enviado exitosamente. Revisa tu bandeja de entrada.
                </p>
                <p
                  className="mb-0"
                  style={{ fontSize: "0.9em", color: "#343a40" }}
                >
                  Puedes cerrar esta ventana después de restablecer tu
                  contraseña.
                </p>
              </div>
            )}
            {emailError && (
              <p className="text-danger medium mt-2">❌ {errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
