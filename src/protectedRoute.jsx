import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
