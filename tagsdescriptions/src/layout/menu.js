import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import Header from './header';

const Menu = () => {
    return ( 
        // <Fragment>
        //     <Link 
        //     to={'/assets'}
        //     className="enlace-cuenta">
        // >
        //     Assets MdP
        //     </Link>
        //     <Link 
        //     to={'/tagsdescriptors'}
        //     className="enlace-cuenta">
        // >
        //     Tags descriptors
        //     </Link>
        // </Fragment>
      
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
                                to={'/tagsdescriptors'}
                                className="btn btn-block btn-primario"
                            >
                                Descriptores DCS
                            </Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        
     );
}
 
export default Menu;