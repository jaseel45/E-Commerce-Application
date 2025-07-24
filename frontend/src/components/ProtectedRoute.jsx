import React from 'react';
import { Navigate } from 'react-router-dom';
import API from '../api/axiosConfig';

function ProtectedRoute({ children, allowedRoles }) {
  const [authStatus, setAuthStatus] = React.useState(null); 

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get('/api/users/profile', {
          withCredentials: true,
        });
        const userRole = res.data.role;

        if (allowedRoles.includes(userRole)) {
          setAuthStatus(true);
        } else {
          setAuthStatus(false);
        }
      } catch (err) {
        setAuthStatus(false);
      }
    };

    checkAuth();
  }, [allowedRoles]);

  if (authStatus === null) return <div className="text-center mt-10">Checking authentication...</div>;

  return authStatus ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
