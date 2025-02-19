import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const OAuthCallback = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  
  useEffect(() => {
    const handleCallback = async () => {
      try {
        await checkAuth();
        navigate('/'); // Redirect to home page after successful login
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, []);

  return <div>Authenticating...</div>;
};