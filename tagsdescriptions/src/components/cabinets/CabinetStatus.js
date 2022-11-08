import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import authContext from '../../context/auth/authContext'
import alertContext from '../../context/alerts/alertContext';
import assetContext from '../../context/asset/assetContext';
import CabinetsContext from '../../context/cabinets/cabinetsContext';
import CabinetImages from './CabinetImages';

const CabinetStatus = () => {

    let { cabinetNameParam } = useParams() //levanto nombre gabinete que esta especificado en app.js
    const cabContext = useContext(CabinetsContext)
    const { selectCabinet, cabinetSelected, getCabinet, getCabinetbyName, selectCabinetbyName } = cabContext
    const aContext = useContext(alertContext)
    const { alert } = aContext
    const asContext = useContext(assetContext)
    const { deSelectAsset, asset } = asContext
    const auContext = useContext(authContext)
    const { getUser } = auContext;

    //const cabinetstatusID = localStorage.getItem('cabinetstatusID');
    //let cabinetname = getCabinetbyName(cabinetNameParam)
    //State local
    const [cabinetName, setCabinetName] = useState('')
    const [area, setCabinetArea] = useState('');
    const [cabinetDescription, setCabinetDescription] = useState('')
    const [cabinetLatitude, setCabinetLatitude] = useState('')
    const [cabinetLongitude, setCabinetLongitude] = useState('')
    const [cabinetSize, setCabinetSize] = useState('') //ver....
    const [files, setFiles] = useState([])

    /*useEffect(()=>{
        if(cabinetNameParam){
            cabinetname = getCabinetbyName(cabinetNameParam)
            console.log("El nombre del gabinete es: ",cabinetname)
        }
    },[cabinetNameParam])*/

    /*useEffect(()=>{
        console.log("El gabinete es: ",cabinetNameParam)
        if(cabinetNameParam)
            getCabinetbyName(cabinetNameParam)
    }, [cabinetNameParam])
*/
    useEffect(() => {
        /*if (cabinetstatusID) {
            getCabinet(cabinetstatusID)
            console.log(cabinetstatusID)
            selectCabinet(cabinetstatusID)
            localStorage.setItem('cabinetstatusID', '')
        }*/
        console.log("El gabinete es 1 : ",cabinetNameParam)
        if(cabinetNameParam){
            console.log("El gabinete es 2: ",cabinetNameParam)
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
        if (cabinetSelected) {
            if (cabinetSelected) {
                console.log("Aca entre...")
                setCabinetName(cabinetSelected[0].cabinetName);
                setCabinetArea(cabinetSelected[0].area)
                setCabinetLatitude(cabinetSelected[0].cabinetLatitude)
                setCabinetLongitude(cabinetSelected[0].cabinetLongitude)
                setCabinetSize(cabinetSelected[0].cabinetSize)
                setCabinetDescription(cabinetSelected[0].cabinetDescription)
                setFiles(cabinetSelected[0].files)
                console.log(files)
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
            {files ? //tuve que poner esto porque files, tarda en cargar
                <CabinetImages 
                    imgs={files}
                />
            :
                null
            }
        </>
    )
}

export default CabinetStatus
