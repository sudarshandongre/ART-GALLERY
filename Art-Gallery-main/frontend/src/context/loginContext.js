import React, { createContext, useContext } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = LoginContext.Provider;

export const useLogin = () => {
  return useContext(LoginContext);
};
