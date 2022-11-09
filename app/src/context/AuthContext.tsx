import { createContext, useState } from "react";
import { TokenContextType, ChildrenProp } from "../myTypes";

const defaultValue = {
  token: null,
  setTokenValue: () => {
    null;
  },
};

const AuthContext = createContext<TokenContextType>(defaultValue);

export const AuthProvider = ({ children }: ChildrenProp) => {
  const [token, setToken] = useState(defaultValue.token);

  const setTokenValue = (value: string | null) => {
    setToken(value as null);
  };

  return <AuthContext.Provider value={{ token, setTokenValue }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
