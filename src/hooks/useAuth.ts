import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'worker';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Aquí iría la lógica real de autenticación
      const mockUser: User = {
        id: '1',
        name: username,
        role: 'worker'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };
};