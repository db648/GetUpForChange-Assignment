//action types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

// action creators
export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
  });
  
