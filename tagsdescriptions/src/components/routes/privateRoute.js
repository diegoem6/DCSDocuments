import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/authContext';

const PrivateRoute = ({ children }) => {
    const { authenticated, loading } = useAuth();

    if (loading) {
        return <div>Cargando...</div>; // O un componente de carga más elaborado
    }

    return authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;