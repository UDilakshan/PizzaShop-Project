// src/context/actions/userActions.js

export const SET_USER = "SET_USER";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setUserNull = () => setUser(null); // Exporting setUserNull action