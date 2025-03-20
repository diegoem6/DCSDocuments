import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth/authContext';

const HeaderMenu = () => {
    const { user, checkAuth, logout, loading } = useAuth();
    const [showSearch, setShowSearch] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !loading) {
            checkAuth();
        }
        // eslint-disable-next-line
        //get current url 
        const url = window.location.href;
        if(url){
            const arrayURL = url.split('/');
            setShowSearch(arrayURL[arrayURL.length-1]==='tagsalldescriptors');
        }
    }, [checkAuth, loading]);

    if (loading) {
        return (
            <header className="app-header">
                <p>Cargando...</p>
            </header>
        );
    }
    
    const changePassword = () => {
        window.open("/changePassword", "_self");
    };

    const search = () => {
        window.open('/tagsalldescriptors', '_self');
    };

    return (  
        <header className="app-header">
            {user ? <p className="nombre-usuario">Hola <span>{user.name}</span></p> : null}
            
            <nav className="nav-principal">
                {!showSearch &&
                    <button 
                        className="btn btn-blank cerrar-sesion"
                        onClick={search}
                    >Búsqueda Avanzada</button>
                }
           
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={changePassword}
                >Cambiar contraseña</button>
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={logout}
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
}
 
export default HeaderMenu;