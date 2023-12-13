import React, { useContext, useEffect, useState } from 'react';
import authContext from '../context/auth/authContext'

const Header = () => {
    const auContext = useContext(authContext)
    const { user, getUser, logOff } = auContext;
    const [showSearch, setShowSearch] = useState(false)

  
    
    useEffect(() => {
        getUser()
        // eslint-disable-next-line
          //get current url 
        const url = window.location.href
        if(url){
            const arrayURL = url.split('/')
            setShowSearch(arrayURL[arrayURL.length-1]=='tagsalldescriptors')
        }
    }, [])
    const search =()=>{
        window.open('/tagsalldescriptors', '_self') 
    }
    return (
        <header className="app-header">
            {user ? <p className="nombre-usuario">Hola {' '}
                <span>
                    {user.name}
                </span></p> : null}

            <nav className="nav-principal">
                {!showSearch &&
                    <button 
                        className = "btn btn-blank cerrar-sesion"
                        onClick={search}
                    >Búsqueda Avanzada</button>
                }
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={logOff}
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
}

export default Header;