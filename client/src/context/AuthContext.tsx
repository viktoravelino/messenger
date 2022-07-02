import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AuthContextProps {
  onIdSubmit: (id: string) => void;
  id: string;
}

const AuthContext = createContext<AuthContextProps>({
  onIdSubmit: (id) => {},
  id: '',
});

export function AuthProvider({ children }: any) {
  const [id, setId] = useLocalStorage<string>('id', '');

  function onIdSubmit(id: string): void {
    setId(id);
  }

  return (
    <AuthContext.Provider value={{ onIdSubmit, id }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
