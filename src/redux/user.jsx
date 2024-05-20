import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USERS");

const initialState = {};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    return action.payload;
  });
});

// export const userReducer = createReducer(initialState, {
//   [setUser]: (state, action) => {
//     return action.payload;
//   },
// });
