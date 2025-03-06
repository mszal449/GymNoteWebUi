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

  useEffect(() => {
    if (!user && !isLoading) {
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

  if (!user && !isLoading) {
    login();
    return null;
  }

  return element;
};

export default PrivateRoute;