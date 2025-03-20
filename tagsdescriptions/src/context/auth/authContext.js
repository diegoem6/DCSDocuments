import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../../config/axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosClient.defaults.headers.common['x-auth-token'] = token;
            checkAuth();
        } else {
            setLoading(false);
        }
    }, []);

    const checkAuth = async () => {
        try {
            const response = await axiosClient.get('/api/auth', {
                timeout: 10000,
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setUser(response.data.user);
            setAuthenticated(true);
            setError(null);
        } catch (error) {
            console.error('Error de autenticación:', error);
            setError(error.message || 'Error de autenticación');
            setUser(null);
            setAuthenticated(false);
            localStorage.removeItem('token');
            delete axiosClient.defaults.headers.common['x-auth-token'];
        } finally {
            setLoading(false);
        }
    };

    const getUser = async () => {
        try {
            const response = await axiosClient.get('/api/auth', {
                timeout: 10000,
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setUser(response.data.user);
            setAuthenticated(true);
            setError(null);
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            setError(error.message || 'Error al obtener usuario');
            setUser(null);
            setAuthenticated(false);
        }
    };

    const login = async (credentials) => {
        try {
            setError(null);
            console.log('credentials', credentials);
            const response = await axiosClient.post('/api/auth', credentials, {
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('response', response);
            const { token } = response.data;
            localStorage.setItem('token', token);
            axiosClient.defaults.headers.common['x-auth-token'] = token;
            await checkAuth();
            return true;
        } catch (error) {
            console.error('Error de login:', error);
            setError(error.response?.data?.msg || error.message || 'Error al iniciar sesión');
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axiosClient.defaults.headers.common['x-auth-token'];
        setUser(null);
        setAuthenticated(false);
        setError(null);
    };

    return (
        <AuthContext.Provider value={{
            authenticated,
            loading,
            user,
            error,
            login,
            logout,
            checkAuth,
            getUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;