/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react';
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
import ImageSlider from '../imageslider/imageslider';

const cabinets = () => {

    const cabContext = useContext(CabinetsContext)
    const { form, showForm, cabinetSelected } = cabContext
    const aContext = useContext(alertContext)
    const { alert } = aContext
    const asContext = useContext(assetContext)
    const { deSelectAsset, asset } = asContext
    const auContext = useContext(authContext)
    const { getUser } = auContext;

    const [sizeArray, setSizeArray] = useState(0)

    useEffect(() => {
        deSelectAsset();
        getUser();
    }, [])

    useEffect(() => {
        if (form) {
            showForm();
        }
    }, [asset])

    useEffect(() => {
        if (cabinetSelected){
            console.log(cabinetSelected.files.length)
            console.log(cabinetSelected.files)
            setSizeArray(cabinetSelected.files.length) //tarda en actualizar el sizeArray
            console.log("El array tiene: ",sizeArray)
        }
    }, [cabinetSelected]); //cada vez que cambia la cantidad de imagenes


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
                        {/*
                        (cabinetSelected) //sizeArray
                            ? (<ImageSlider 
                                images={cabinetSelected.files} />)
                            : <h1>No hay imagenes para mostrar {sizeArray}</h1>*/
                        }


                    </div>
                </main>
            </div>
        </div>
    )
}

export default cabinets