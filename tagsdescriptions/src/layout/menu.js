import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import Header from './header';

const Menu = () => {
    return ( 

            <Fragment>
            <Header />
                <div className="form-menu">
                    
                    <div className="contenedor-form sombra-dark">
                        <div className="campo-form"> 
                
                            <Link 
                                to={'/assets'}
                                className="btn btn-block btn-primario"
                            >
                                Estructura MdP
                            </Link>
                        </div>
                        <div className="campo-form"> 
                
                            <Link 
                                to={'/users'}
                                className="btn btn-block btn-primario"
                            >
                                Usuarios
                            </Link>
                        </div>
                    </div>

                    <div className="contenedor-form sombra-dark">
                        <div className="campo-form">
                            <Link 
                                to={'/tagsdescriptors'}
                                className="btn btn-block btn-primario"
                            >
                                Descriptores DCS
                            </Link>
                        </div>
                        <div className="campo-form">
                            <Link 
                                to={'/network'}
                                className="btn btn-block btn-primario"
                            >
                                Network DCS
                            </Link>
                        </div>
                        <div className="campo-form">
                            <Link 
                                to={'/devices'}
                                className="btn btn-block btn-primario"
                            >
                                Dispositivos DCS
                            </Link>
                        </div>
                        <div className="campo-form">
                            <Link 
                                to={'/architecture'}
                                className="btn btn-block btn-primario"
                            >
                                Arquitectura Redes
                            </Link>
                        </div>
                    </div>


                    
                </div>
            </Fragment>
        
     );
}
 
export default Menu;