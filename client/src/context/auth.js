import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

// Action Types
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const initialState = {
  user: null,
};

// Check if there is a token and the token is valid
if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  // if the token is expired
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

// state
const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, user: action.payload };
    case LOG_OUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    // save token to local storage
    localStorage.setItem("jwtToken", userData.token);
    dispatch({ type: LOG_IN, payload: userData });
  };

  const logout = () => {
    // remove token from local storage
    localStorage.removeItem("jwtToken");
    dispatch({ type: LOG_OUT });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
