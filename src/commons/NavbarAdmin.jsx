import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/navbaradmin.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavbarAdmin() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-admin fixed-top">
        <div className="container-fluid">
          <Link to={"/usuariosadmin"} className="nav-link admin">
            Netflix
            {/* <img src={icono} /> */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user.isAdmin ? (
                <li className="nav-item">
                  <Link to={"/"} className="nav-link user-nav-option">
                    Vista Usuario
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {/* 
              <li className="nav-item">
                <Link to={"/favoritos"} className="nav-link">
                  Favoritos
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to={"/usuariosadmin"} className="nav-link">
                  Usuarios
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarAdmin;
