export const SET_USER = "SET_USER";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setUserNull = () => setUser(null); // Exporting setUserNull action



export const alertDanger = (message) => ({
  type: 'ALERT_DANGER',
  payload: message,
});

export const alertNULL = () => ({
  type: 'ALERT_NULL',
});

export const alertSuccess = (message) => ({
  type: 'ALERT_SUCCESS',
  payload: message,
});
