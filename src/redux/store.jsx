import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { recoverReducer } from "./recover";
import { favoritosReducer } from "./favs";

const store = configureStore({
  reducer: {
    user: userReducer,
    recover: recoverReducer,
    favoritos: favoritosReducer,
  },
});

export default store;
