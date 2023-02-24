import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute: React.FC = () => {
  const { session } = useAuth();

  return session ? <Outlet /> : <Navigate to='/signin' />;
};

export default PrivateRoute;
