import React, {useContext, useEffect} from 'react';
import authContext from '../context/auth/authContext'

const HeaderMenu = () => {
    const auContext = useContext(authContext)
    const {user,getUser,logOff} = auContext;

    useEffect(() => {
        getUser()
        // eslint-disable-next-line
    }, [])
    
    const changePassword = () => {
        window.open("/changePassword", "_self")
    }
    return (  
        <header className="app-header">
            {user ? <p className="nombre-usuario">Hola <span>{user.name}</span></p> : null}
            
            <nav className="nav-principal">
                <button 
                    className = "btn btn-blank cerrar-sesion"
                    onClick={changePassword}
                >Cambiar contraseña</button>
                <button 
                    className = "btn btn-blank cerrar-sesion"
                    onClick={logOff}
                >Cerrar Sesión</button>
                
            </nav>
        </header>
    );
}
 
export default HeaderMenu;