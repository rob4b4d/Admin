import React from 'react';
import { Navigate } from 'react-router-dom';
import NotFound from '../views/NotFound';
import { useStateContext } from '../context/ContextProvider'; 

const ProtectedRoute = ({ roles, children }) => {
  const { user } = useStateContext();

  if (!roles || roles.length === 0 || !roles.includes(user.role)) {
    return <NotFound />;
  }

  return children;
};

export default ProtectedRoute;
