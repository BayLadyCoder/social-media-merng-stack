import React, { createContext, useReducer } from "react";

// Action Types
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

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
  const [state, dispatch] = useReducer(authReducer, { user: null }); // reducer, initialState

  const login = (userData) => {
    dispatch({ type: LOG_IN, payload: userData });
  };

  const logout = () => {
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
