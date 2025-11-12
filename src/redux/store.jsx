import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { recoverReducer } from "./recover";
import { favoritosReducer } from "./favs";
import { serieFavoritosReducer } from "./serieFavs";

const store = configureStore({
  reducer: {
    user: userReducer,
    recover: recoverReducer,
    favoritos: favoritosReducer,
    serieFavoritos: serieFavoritosReducer,
  },
});

export default store;
