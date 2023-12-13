import React, {useState, useContext, useEffect,Fragment} from 'react';
import { useParams } from 'react-router-dom'
import deviceContext from '../../context/devices/devicesContext'
import iocardsContext  from '../../context/iocards/iocardsContext';
import ConectionC300 from './ConectionC300'

function ConnectionsC300() {
    const {idMongo}=useParams();
    const dContext = useContext(deviceContext)
    const {getDevice, getDeviceType, deviceSelected, devicetype, getDeviceStatus, status} = dContext
    const iContext = useContext(iocardsContext);
    const {iocardcontrollers, getIoCardsContrllerA, getIoCardsContrllerB}= iContext;
    
    const [deviceTipo, setDeviceTipo] = useState('')
    useEffect(() => {
        if (idMongo){
            getDevice(idMongo)
            getDeviceStatus(idMongo)
            }else{
            return <h2>Seleccione un dispositivo</h2>
        }
       
    // eslint-disable-next-line
    },[idMongo])

    useEffect(() => {
        if(deviceSelected){
            
            getDeviceType(deviceSelected.deviceType);
            if(deviceSelected.deviceName.includes('B')){
                console.log('ACÁ BUSCO EN EL CAMPO CONTROLLER B DE LA COLECCIÓN IOCARDS')
            }else{
                console.log('ACÁ BUSCO EN EL CAMPO CONTROLLER A DE LA COLECCIÓN IOCARDS')
                getIoCardsContrllerA(deviceSelected._id)
            }
        }
        // eslint-disable-next-line
    }, [deviceSelected, status])

    useEffect(() => {
        if(devicetype){
            setDeviceTipo(devicetype.type)
            deviceSelected.type_desc =  devicetype
           
        }
        // eslint-disable-next-line
    }, [devicetype])


  return (
    <Fragment>
         <Fragment>                
            {(deviceSelected) ? 
                <div className="container">
                     <div className="row">
                    <div className = "divHeader">
                        <h1>{deviceTipo} : {deviceSelected.deviceName}</h1>
                        <h2>{deviceSelected.deviceDescription}</h2>
                        <h2>IP: {deviceSelected.deviceIP}</h2>
                    </div>
                    { (iocardcontrollers) ? 
                    //recorrer iocardscontroller 
                    
                   
                        <div className="col-sm-4">
                        {iocardcontrollers.map( iocardcontroller =>{
                            return(
                                <ConectionC300
                                    key={iocardcontroller._id}
                                    iocardcontroller={iocardcontroller}
                                />
                                )
                        })}
                       </div>
                      
                     
                        :
                        null
                    }
                </div>
                </div>
                : 
                null 
            }
        </Fragment>
    </Fragment>
  )
}

export default ConnectionsC300