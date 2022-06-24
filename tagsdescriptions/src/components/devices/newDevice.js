import React,{Fragment, useState, useContext, useEffect} from 'react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import alertContext from '../../context/alerts/alertContext';
import devicesContext from '../../context/devices/devicesContext';
import assetContext from '../../context/asset/assetContext';
//import Files from 'react-files'

const NewDevice = () => {
    
    
    const asContext = useContext(assetContext)
    const {asset} = asContext

    const dContext = useContext(devicesContext)
    const {deviceSelected, showForm, createDevice, updateDevice, devicetypes, getDeviceTypes, message, resetMessage} = dContext

    const aContext = useContext(alertContext)
    const {alert, showAlert} = aContext


    const [deviceName, setDeviceName] = useState('')
    const [deviceDescription, setDeviceDescription] = useState('')
    const [deviceType, setDeviceType] = useState('')
    const [deviceIP, setDeviceIP] = useState('')
    const [deviceURLOPC, setdeviceURLOPC] = useState('')

    
    useEffect(() => { /*tuve que meterlo en un useeffect porque en una funcion entraba dos veces*/
        //console.log(deviceSelected)
        getDeviceTypes()
        if (deviceSelected !== null && deviceSelected.length>0){
            //console.log(deviceSelected)
            const [currentnetDevice] = deviceSelected
            setDeviceName(currentnetDevice.deviceName)
            setDeviceDescription(currentnetDevice.deviceDescription)
            setDeviceType(currentnetDevice.deviceType)
            setDeviceIP(currentnetDevice.deviceIP)
            setdeviceURLOPC(currentnetDevice.deviceURLOPC)
        }else{
            setDeviceName('')
            setDeviceDescription('')
            setDeviceType('')
            setDeviceIP('')
            setdeviceURLOPC('')
        }
        // eslint-disable-next-line
    }, [deviceSelected])


    useEffect(() => { //para los errores
        if(message){
            showAlert(message.msg, message.category)
            resetMessage()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])
    
      
 
    
    if (!asset) return null

    const onChangeDeviceName = (e)=>{
        setDeviceName(e.target.value)
    }
    const onChangeDeviceDescription = (e)=>{
        setDeviceDescription(e.target.value)
    }
    /*const onChangedeviceType = (e)=>{
        setDeviceType(e.target.value)
    }*/
    const onChangeDeviceIP = (e)=>{
        setDeviceIP(e.target.value)
    }

    const onChangeDeviceURLOPC = (e)=>{
        setdeviceURLOPC(e.target.value)
    }

    const onClickCancelar = (e) =>{
        showForm();
    }
    
    const onSubmitDevice = (e)=>{

        e.preventDefault();
        if(deviceType==="")
            {showAlert("Se debe ingresar un modelo válido", "alerta-error")
            return
            }
        const newDevice = {}
        newDevice.deviceName = deviceName;
        newDevice.deviceDescription = deviceDescription;
        newDevice.deviceType = deviceType;
        newDevice.deviceIP = deviceIP;
        newDevice.deviceURLOPC = deviceURLOPC;
        newDevice.asset = asset[0]._id;
        //console.log(newDevice)
        if(deviceSelected===null) /*Nuevo*/
            createDevice(newDevice)
        else{ /*update*/ 
            //console.log("Entro Update");
            newDevice._id=deviceSelected[0]._id; /* le agrego el ID porque es existente */
            updateDevice(newDevice)
        }
        //}
    }

       
    return ( 
        <Fragment>
            {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null}
                <h2>Dispositivo en el asset: {asset[0].name}</h2>
                <div className="formNode">
                    <div className="node">
                        <form   
                            className="formulario-nuevo-proyecto"
                            onSubmit = {onSubmitDevice}
                            >
                            <input  
                                type="text"
                                className={`input-text`}
                                placeholder="Device name"
                                name="deviceName"
                                value ={deviceName}
                                onChange = {onChangeDeviceName}
                            />
                             <input  
                                type="text"
                                className={`input-text`}
                                placeholder="Description"
                                name="deviceDescription"
                                value ={deviceDescription}
                                onChange = {onChangeDeviceDescription}
                            />
                             <select className={`input-text`}
                                onChange={e => setDeviceType(e.target.value)}
                                value={deviceType} //esto es para que se mantenga seleccionado lo que elegi en el combo, sino vuelve al que estaba antes
                             >
                                <option key="asdasd" value="">Seleccione un dispositivo</option>
                                {//cargo todos los modelos:
                                devicetypes ?
                                    devicetypes.map(devicetype=>( //al ser un array puedo utilizar map, que siempre requiere de un key
                                    <option key={devicetype._id} value={devicetype._id}>{devicetype.type}</option>
                                ))
                                : null
                                }
                             </select>
                                
                             <input  
                                type="text"
                                className={`input-text`}
                                placeholder="IP Address"
                                name="deviceIP"
                                value ={deviceIP}
                                onChange = {onChangeDeviceIP}
                            />
                            <input 
                                type="text"
                                className={`input-text`}
                                placeholder="URL OPC"
                                name="deviceURLOPC"
                                value={deviceURLOPC}
                                onChange = {onChangeDeviceURLOPC}
                            />
                            {deviceSelected===null ?  
                                (<input 
                                type="button"
                                className="btn btn-primario btn-block"
                                onClick = {onSubmitDevice}
                                value = "Agregar Dispositivo"
                                />
                                )
                                :
                                (<input 
                                    type="button"
                                    className="btn btn-primario btn-block"
                                    onClick = {onSubmitDevice}
                                    value = "Guadrdar Dispositivo"
                                    />
                                )
                            }
                                <input 
                                    type="button"
                                    className="btn btn-primario btn-block"
                                    onClick = {onClickCancelar}
                                    value = "Cancelar"
                                />
                            {/* {(tagdescriptor !== null && tagdescriptor.length>0) ?
                        
                                (<input 
                                    type="submit"
                                    className="btn btn-primario btn-block"
                                    value = "Guardar Tag"
                                /> )
                                :
                                (<input 
                                    type="submit"
                                    className="btn btn-primario btn-block"
                                    value = "Agregar Tag"
                                /> )
                            } */}
                            
                        </form>
                    </div>
                    
                </div>
                
        </Fragment>
     );
}
 
export default NewDevice;