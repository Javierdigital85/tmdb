import { createAction, createReducer } from "@reduxjs/toolkit";
export const setFavoritos = createAction("SET_FAVORITOS");

const initialState = [];

export const favoritosReducer = createReducer(initialState, (builder) => {
  builder.addCase(setFavoritos, (state, action) => {
    return action.payload;
  });
});
