import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
// import Grid from "../commons/Grid";
import GridSeries from "../commons/GridSeries";

function SerieFavorites() {
  const [favs, setFavs] = useState([]);
  const user = useSelector((state) => state.user);
  const id = user.id;
  useEffect(() => {
    if (id) {
      axios
        .get(
          "/api/serie/favseries",
          {
            params: { prospectId: id },
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => setFavs(res.data))
        .catch((error) =>
          console.log("Error al obtener serie favoritos", error)
        );
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <h1>Favourites Series</h1>
      <GridSeries collection={favs} />
    </>
  );
}

export default SerieFavorites;
