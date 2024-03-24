import { createContext, useContext, useState, useEffect } from 'react';
import { getUser } from '../../services/auth';
import { User } from '@supabase/supabase-js';
import { AuthContextType } from '../types';

const AuthContext = createContext < AuthContextType| undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getUser();
      setUser(currentUser);
    }
    void fetchUser();
  }, []);

  const value = { user, setUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, AuthContext, useAuthContext };
