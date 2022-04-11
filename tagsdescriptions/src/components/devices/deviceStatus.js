import React, {useState, useContext, useEffect,Fragment} from 'react';
import deviceContext from '../../context/devices/devicesContext'
import C300 from './C300'
import PGM from './PGM';

const DeviceStatus = () => {
    
    const devicestatusID=localStorage.getItem('devicestatusID');
    const dContext = useContext(deviceContext)
    const {getDevice, getDeviceType, networkmodelo, deviceSelected, devicetype, getDeviceStatus, status} = dContext

    const [deviceTipo, setDeviceTipo] = useState('')


    useEffect(() => {
        if (devicestatusID){
            getDevice(devicestatusID)
            getDeviceStatus(devicestatusID)
            localStorage.setItem('devicestatusID','')
            //console.log("El nodo seleccionado es: ",networkNodeSelected) //aca me quede no se por que no trae nada networkNodeSelected, pero si tiene...
            }
        else{
            return <h2>Seleccione un dispositivo</h2>
        }
    // eslint-disable-next-line
    }, [devicestatusID])

    useEffect(() => {
        if(status && deviceSelected){
            deviceSelected.status_=status
            getDeviceType(deviceSelected.deviceType);
        }
    }, [deviceSelected, status])

    useEffect(() => {
        if(devicetype){
            setDeviceTipo(devicetype.type)
            deviceSelected.type_desc =  devicetype
        }
    }, [devicetype])

    console.log(deviceSelected)
    return ( 
        <Fragment>
            
                
            {(deviceSelected && deviceSelected.status_) ? 
                <div>
                    <div className = "divHeader">
                        <h1>{deviceTipo} : {deviceSelected.deviceName}</h1>
                        <h2>{deviceSelected.deviceDescription}</h2>
                        <h2>IP: {deviceSelected.deviceIP}</h2>
                    </div>
                    { deviceTipo === "C300" ? 
                        <C300 
                            deviceSelected = {deviceSelected} /> 
                            :
                        <PGM
                            deviceSelected = {deviceSelected} /> 
                    }
                </div>
                : 
                null 
            }
        </Fragment>
     );
}
 
export default DeviceStatus;