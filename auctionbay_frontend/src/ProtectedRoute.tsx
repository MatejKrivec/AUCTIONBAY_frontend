import React, { useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';

const checkToken = () => {
  // Get your token from wherever you store it
  const token = localStorage.getItem('token');
  
  // Check if the token is valid (you might want to do this on server side)
  // For simplicity, we just check if token exists
  return token !== null;
};

const fetchProtected = async (token: boolean) => {
  try {
    const response = await fetch('http://localhost:3000/auth/protected', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });
    if (!response.ok) {
      throw new Error('Failed to authenticate'); 
    }
    const responseData = await response.json();
    return responseData.route;
  } catch (error) {
    console.error('Error authenticating:', error);
    return null;
  }
}

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, component: Component }) => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const token = checkToken();
    if (token) {
      fetchProtected(token).then(setRoute);
    }
  }, []);

  return route ? (
    <Route path={path} element={<Component />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
