import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user`, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
      }
      });
      console.log(response)

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setError('Failed to check authentication status');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const login = () => {
    window.location.href = `${backendUrl}/oauth2/authorization/google`;
  };

  const logout = async () => {
    try {
      await fetch(`${backendUrl}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
    } catch (err) {
      setError('Failed to logout');
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        error, 
        login, 
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};