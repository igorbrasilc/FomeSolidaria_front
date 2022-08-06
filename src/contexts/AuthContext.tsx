import React, { createContext, useState } from 'react';
import jwt_decode from "jwt-decode";

interface DecodedToken {
    id: number;
    name: string;
    username: string;
    password?: string;
}

interface IAuthContext {
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
  decodeToken: (token: string | null) => DecodedToken;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
  children: React.ReactNode;
}

const LOCAL_STORAGE_KEY = 'fome-solidaria-token';
const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(persistedToken);

  function signIn(tokenProvided: string) {
    setToken(tokenProvided);
    localStorage.setItem(LOCAL_STORAGE_KEY, tokenProvided);
  }

  function decodeToken(tokenProvided: string) {
    const decodedToken: DecodedToken = jwt_decode(tokenProvided);
    delete decodedToken.password;
    return decodedToken;
  }

  function signOut() {
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, decodeToken }}>
      {children}
    </AuthContext.Provider>
  );
}
