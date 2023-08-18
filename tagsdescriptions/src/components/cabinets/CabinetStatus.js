import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CabinetsContext from '../../context/cabinets/cabinetsContext';
import { MultiImageViewerSimple } from './MultiImageViewer';

const CabinetStatus = () => {

    let { cabinetNameParam } = useParams() //levanto nombre gabinete que esta especificado en app.js
    const cabContext = useContext(CabinetsContext)
    const {
        cabinetSelected,
        getCabinetbyName,
        selectCabinetbyName,
        areas,
        getAreas } = cabContext


    const [cabinetName, setCabinetName] = useState('')
    const [area, setCabinetArea] = useState('');
    const [cabinetDescription, setCabinetDescription] = useState('')
    const [files, setFiles] = useState([])


    useEffect(() => {
        if (cabinetNameParam) {
            getCabinetbyName(cabinetNameParam)
            selectCabinetbyName(cabinetNameParam)
        }
        else {
            return <h2>Seleccione un gabinete</h2>
        }
        // eslint-disable-next-line
    }, [cabinetNameParam])

    useEffect(() => {
        getAreas();
        if (cabinetSelected) {
            setCabinetName(cabinetSelected[0].cabinetName);
            setCabinetArea(cabinetSelected[0].area)
            setCabinetDescription(cabinetSelected[0].cabinetDescription)
            setFiles(cabinetSelected[0].files)
        }
        else {
            setCabinetName('');
            setCabinetArea('');
            setCabinetDescription('');
            setFiles([]);
        }

        // eslint-disable-next-line
    }, [cabinetSelected])


    if (!areas) return null;

    return (
        <>
            <div className="divHeaderNetwork">
                <h1>{cabinetName}</h1>
                <h2>Descripción: {cabinetDescription} -  Área: {areas.length > 0 ?
                    areas.map(a => {
                        if (a.area === area)
                            return a.description;
                        else 
                            return null;
                    })
                    : null
                }   </h2>
            </div>
            {files.length > 0 ?
                <MultiImageViewerSimple
                    arr={files}
                />
                :
                <h2>No hay imagenes</h2>
            }
        </>
    )
}

export default CabinetStatus
