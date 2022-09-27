/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
// Compare this snippet from src\network\network.js:  
import authContext from '../../context/auth/authContext'
import alertContext from '../../context/alerts/alertContext';
import SidebarCabibinets from '../../layout/sidebarCabinets';
import CabinetsContext from '../../context/cabinets/cabinetsContext';
import assetContext from '../../context/asset/assetContext';
import HeaderCabinets from './HeaderCabinets';
import Header from '../../layout/header'
import NewCabinets from './NewCabinets';
import CabinetsList from './CabinetsList';

const cabinets = () => {

    const cabContext = useContext(CabinetsContext)
    const { form, showForm } = cabContext
    const aContext = useContext(alertContext)
    const { alert } = aContext
    const asContext = useContext(assetContext)
    const { deSelectAsset, asset } = asContext
    const auContext = useContext(authContext)
    const { getUser } = auContext;

    useEffect(() => {
        deSelectAsset();
        getUser();
    }, [])

    useEffect(() => {
        if (form) {
            showForm();
        }
    }, [asset])

    return (
        <div className="contenedor-app">
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                : null}
            <SidebarCabibinets />

            <div className="seccion-principal">
                <Header />

                <main>
                    <HeaderCabinets />

                    <div className="contenedor-tareas">
                        {form
                            ? (<NewCabinets />)
                            : (<CabinetsList />)

                        }


                    </div>
                </main>
            </div>
        </div>
    )
}

export default cabinets