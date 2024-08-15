import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
//import { ToastContainer, toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setErrorSubmitted] = useState(false);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorSubmitted(true);
    } else {
      axios
        .put(
          "/api/users/forgot",
          {
            email,
          },
          {
            returning: true,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setEmailSubmitted(true);
          }
        });
      // .catch((error) => {
      //   setErrorSubmitted(true);
      //   console.log("HA OCURRIDO UN ERROR CON LA RECUPERACION", error);
      // });
    }
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
            {emailSubmitted ? (
              <p className="text-success medium mt-2">Email enviado</p>
            ) : (
              <p className="medium mt-2">Complete el campo,por favor.</p>
            )}
            {emailError ? (
              <p className="text-danger medium mt-2">
                Debe ingresar su e-mail.
              </p>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
