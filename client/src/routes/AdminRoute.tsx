import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute: React.FC = () => {
  const { isAdmin } = useAuth();

  return isAdmin ? <Outlet /> : <Navigate to='/404' />;
};

export default AdminRoute;
