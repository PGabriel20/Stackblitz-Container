import React from 'react';
import { Routes as Router, Route } from 'react-router-dom';
import NotFound from '../pages/404';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Metrics from '../pages/Metrics';
import SignIn from '../pages/SignIn';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';

const Routes: React.FC = () => {
  return (
    <Router>
      {/* Public routes */}
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<SignIn />} />

      {/* Private routes */}
      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>

      {/* Admin routes */}
      <Route element={<AdminRoute />}>
        <Route path='/admin' element={<Metrics />} />
      </Route>

      {/* Catch all */}
      <Route path='*' element={<NotFound />} />
    </Router>
  );
};

export default Routes;
