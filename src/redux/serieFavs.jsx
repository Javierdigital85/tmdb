import { createAction, createReducer } from "@reduxjs/toolkit";
export const setSerieFavoritos = createAction("SET_SERIE_FAVORITOS");

const initialState = [];

export const serieFavoritosReducer = createReducer(initialState, (builder) => {
  builder.addCase(setSerieFavoritos, (state, action) => {
    return action.payload;
  });
});

