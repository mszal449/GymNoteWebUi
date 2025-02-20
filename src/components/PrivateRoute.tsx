import React, { JSX, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { LoadingOverlay } from '@mantine/core';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { user, login, isLoading } = useAuth();
  const location = useLocation();

  // Store the attempted URL before redirecting to login
  useEffect(() => {
    if (!user && !isLoading) {
      // Save the current path to localStorage
      localStorage.setItem('redirectPath', location.pathname);
    }
  }, [user, isLoading, location]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LoadingOverlay visible={true} />
      </div>
    );
  }

  if (!user) {
    login();
    return null;
  }

  return element;
};

export default PrivateRoute;