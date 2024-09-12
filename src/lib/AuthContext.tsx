'use client'

import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  admin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, isAuthenticated, isAdmin }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated);
  const [admin, setAdmin] = useState<boolean>(isAdmin);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};