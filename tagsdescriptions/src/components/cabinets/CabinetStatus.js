import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import authContext from '../../context/auth/authContext'
import alertContext from '../../context/alerts/alertContext';
import assetContext from '../../context/asset/assetContext';
import CabinetsContext from '../../context/cabinets/cabinetsContext';
import CabinetImages from './CabinetImages';
import { MultiImageViewer2, MultiImageViewer } from './MultiImageViewer';

const CabinetStatus = () => {

    const cabContext = useContext(CabinetsContext)
    const { selectCabinet, cabinetSelected, getCabinet } = cabContext
    const aContext = useContext(alertContext)
    const { alert } = aContext
    const asContext = useContext(assetContext)
    const { deSelectAsset, asset } = asContext
    const auContext = useContext(authContext)
    const { getUser } = auContext;

    const cabinetstatusID = localStorage.getItem('cabinetstatusID');

    //State local
    const [cabinetName, setCabinetName] = useState('')
    const [area, setCabinetArea] = useState('');
    const [cabinetDescription, setCabinetDescription] = useState('')
    const [cabinetLatitude, setCabinetLatitude] = useState('')
    const [cabinetLongitude, setCabinetLongitude] = useState('')
    const [cabinetSize, setCabinetSize] = useState('') //ver....
    const [files, setFiles] = useState([])

    useEffect(() => {
        if (cabinetstatusID) {
            getCabinet(cabinetstatusID)
            console.log(cabinetstatusID)
            selectCabinet(cabinetstatusID)
            localStorage.setItem('cabinetstatusID', '')

        }
        else {
            return <h2>Seleccione un gabinete</h2>
        }
        // eslint-disable-next-line
    }, [cabinetstatusID])

    useEffect(() => {
        if (cabinetSelected) {
            if (cabinetSelected) {
                setCabinetName(cabinetSelected.cabinetName);
                setCabinetArea(cabinetSelected.area)
                setCabinetLatitude(cabinetSelected.cabinetLatitude)
                setCabinetLongitude(cabinetSelected.cabinetLongitude)
                setCabinetSize(cabinetSelected.cabinetSize)
                setCabinetDescription(cabinetSelected.cabinetDescription)
                setFiles(cabinetSelected.files)
            }
            else {
                setCabinetName('');
                setCabinetArea('');
                setCabinetLatitude('');
                setCabinetLongitude('');
                setCabinetSize('');
                setCabinetDescription('');
                setFiles([]);
            }
        }
        // eslint-disable-next-line
    }, [cabinetSelected])
    //const { cabinetName, cabinetArea, cabinetLatitude, cabinetLongitude, cabinetSize, cabinetDescription } = this;

    return (
        <>
            <div className="divHeaderNetwork">
                <h1>{cabinetName}</h1>
            </div>
            {/*<CabinetImages
                imgs={files}
            />*/}
            <MultiImageViewer
                arr={files}
            />
        </>
    )
}

export default CabinetStatus
