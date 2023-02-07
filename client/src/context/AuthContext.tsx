import React, { createContext, useState } from "react";

interface IProps {
  isAuthenticated: boolean;
  login: (value: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<IProps>({
  isAuthenticated: false,
  login() {},
  logout() {},
});

interface IChildren {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: IChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;
