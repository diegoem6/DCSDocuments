import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import authContext from '../../context/auth/authContext'
// import alertContext from '../../context/alerts/alertContext';
// import assetContext from '../../context/asset/assetContext';
import CabinetsContext from '../../context/cabinets/cabinetsContext';
//import CabinetImages from './CabinetImages';
import { MultiImageViewerSimple } from './MultiImageViewer';

const CabinetStatus = () => {

    let { cabinetNameParam } = useParams() //levanto nombre gabinete que esta especificado en app.js
    const cabContext = useContext(CabinetsContext)
    const {
        //selectCabinet,
        cabinetSelected,
        // getCabinet,
        getCabinetbyName,
        selectCabinetbyName,
        areas,
        getAreas } = cabContext
    //const aContext = useContext(alertContext)
    // const { alert } = aContext
    //const asContext = useContext(assetContext)
    //const { deSelectAsset, asset } = asContext
    // const auContext = useContext(authContext)
    // const { getUser } = auContext;

    //const cabinetstatusID = localStorage.getItem('cabinetstatusID');
    //let cabinetname = getCabinetbyName(cabinetNameParam)
    //State local
    const [cabinetName, setCabinetName] = useState('')
    const [area, setCabinetArea] = useState('');
    const [cabinetDescription, setCabinetDescription] = useState('')
    // const [cabinetLatitude, setCabinetLatitude] = useState('')
    // const [cabinetLongitude, setCabinetLongitude] = useState('')
    // const [cabinetSize, setCabinetSize] = useState('') //ver....
    const [files, setFiles] = useState([])


    useEffect(() => {
        if (cabinetNameParam) {
            //setAreasL(getAreas())
            //  console.log("El gabinete es 2: ", cabinetNameParam)
            getCabinetbyName(cabinetNameParam)
            //console.log(cabinetname)
            //selectCabinet(cabinetstatusID)
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
            // setCabinetLatitude(cabinetSelected[0].cabinetLatitude)
            // setCabinetLongitude(cabinetSelected[0].cabinetLongitude)
            // setCabinetSize(cabinetSelected[0].cabinetSize)
            setCabinetDescription(cabinetSelected[0].cabinetDescription)
            setFiles(cabinetSelected[0].files)
        }
        else {
            setCabinetName('');
            setCabinetArea('');
            // setCabinetLatitude('');
            // setCabinetLongitude('');
            // setCabinetSize('');
            setCabinetDescription('');
            setFiles([]);
        }

        // eslint-disable-next-line
    }, [cabinetSelected])
    //const { cabinetName, cabinetArea, cabinetLatitude, cabinetLongitude, cabinetSize, cabinetDescription } = this;

    if (!areas) return null;

    return (
        <>
            <div className="divHeaderNetwork">
                <h1>{cabinetName}</h1>
                <h2>Descripción: {cabinetDescription} -  Área: {areas.length > 0 ?
                    areas.map(a => {
                        if (a.area === area)
                            return a.description
                    })

                    : null
                }   </h2>
            </div>
            {/*<CabinetImages
                imgs={files}
            />*/}
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
