import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom'
import HeaderMenu from './headerMenu';
import authContext from '../context/auth/authContext'

const Menu = () => {
    const auContext = useContext(authContext)
    const { user } = auContext;
    if (!user) return null;
    return (

        <Fragment>
            <HeaderMenu />
            <div className="form-menu">

                {user.rol === "SYSADMIN" ?
                    (<div className="contenedor-form sombra-dark">
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
                    </div>)
                    :
                    null
                }
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
                            to={'/connections'}
                            className="btn btn-block btn-primario"
                        >
                            Conexiones
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
                    <div className="campo-form">
                        <Link
                            to={'/cabinets'}
                            className="btn btn-block btn-primario"
                        >
                            Gabinetes
                        </Link>
                    </div>
                    <div className="campo-form">
                        <Link
                            to={'/iocards'}
                            className="btn btn-block btn-primario"
                        >
                            Tarjetas I/O
                        </Link>
                    </div>
                </div>



            </div>
        </Fragment>

    );
}

export default Menu;