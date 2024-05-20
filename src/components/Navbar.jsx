import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/user";

const Navbar = () => {
  // const [user, setUser] = useState({});
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogOut = (e) => {
    e.preventDefault();
    axios
      .post(
        "/api/users/logout",
        {
          name: user,
        },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .then(() => navigate("/"));

    dispatch(setUser(""));
  };
  // useEffect(() => {
  //   axios
  //     .get("/api/users/")
  //     .then((res) => res.data)
  //     .then((user) => setUser(user))
  //     .catch(() => console.error("Necesitas loguearte"));
  // }, []);

  // const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white sticky-top">
        <div className="container-fluid">
          <Link to="/" className="nav-link me-2">
            Netflix
          </Link>
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user.isAdmin ? (
                <li className="nav-item">
                  <Link
                    to={"/usuariosadmin"}
                    className="nav-link admin-nav-option"
                  >
                    Vista Admin
                  </Link>
                </li>
              ) : (
                <></>
              )}
              <li className="nav-item">
                <Link to="/trendingmovies" className="nav-link">
                  Trending Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/upcomingmovies" className="nav-link">
                  Upcoming Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/search" className="nav-link">
                  Search Movies
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/searchseries" className="nav-link">
                  Search Series
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/series" className="nav-link">
                  Series
                </Link>
              </li>
              {user.id ? (
                <li className="nav-item">
                  <Link to="/favoritos" className="nav-link">
                    Mov.Favoritos
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {user.id ? (
                <li className="nav-item">
                  <Link to="/seriefavoritos" className="nav-link">
                    Ser.Favoritos
                  </Link>
                </li>
              ) : (
                <></>
              )}
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>

              {user.id ? (
                <p className="pNav">Welcome {user.name}!</p>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              )}
              {user.name ? (
                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-danger mx-2"
                  >
                    Log Out
                  </button>
                </li>
              ) : (
                <li>
                  <Link to={"/login"} className="nav-link" size="large">
                    {/* {user.name ? user.name : "Login"} */}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
