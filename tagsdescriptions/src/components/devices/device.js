import React, {useContext} from 'react';
import { Link } from 'react-router-dom'
import devicesContext from "../../context/devices/devicesContext";
import { confirmAlert } from 'react-confirm-alert';
import DeviceStatus from './deviceStatus';


//import 'react-confirm-alert/src/react-confirm-alert.css';

const Device = ({device}) => {
    
    

    const dContext = useContext(devicesContext)
    const {deleteDevice, selectDevice, showForm, getDevice, getDeviceType} = dContext
    //console.log(device)
    
    
    const editDevice = (device)=>{ 
        //console.log(device)
        selectDevice(device._id);
        //selectDevice(device._id);
        showForm();
    }
    

    const deleteDeviceOnCick = () =>{
        deleteDevice(device._id)
    }


    const showDialogConfirm = ()=>{
        confirmAlert({
            title: 'Confirmar',
            message: '¿Estás seguro de eliminar el nodo de red?',
            buttons: [
              {
                label: 'Yes',
                /*onClick: () => console.log("si")*/
                onClick: () => deleteDeviceOnCick()
              },
              {
                label: 'No'
                //onClick: () => console.log("no")
              }
            ]
          });
    }

    return ( 
        <li className="tarea sombra">
            <p>{device.deviceName} </p>
            <p>{device.deviceTypeDesc}</p> 
            
            <div className="acciones">                
            
                {/* <a 
                    target='_blank'
                    href={`${process.env.REACT_APP_SHOWTAG_URL}/showTagDescriptor/${tagdescriptor.tagname}`}
                    className="btn btn-primario">
                    Ver
                </a> */}
                
                <button
                    type="button"
                    className="btn btn-terciario"
                    onClick={showDialogConfirm}
                >Eliminar</button>
                
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick = {()=>{editDevice(device)}}
                >Editar </button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=>
                        {
                            localStorage.setItem('devicestatusID',device._id) //guardo en el localstorage una variable tagdescriptorID con el dato tagdescriptor._id
                            window.open('/devicestatus') // /events esta definido en app.js
                        }
                        /*<NetworkStatus />*/
                    }
                >Status</button>


                {/* <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={showDialogConfirm}
                >Confirm</button> */}
                
            </div>
        </li> 
    

     );
}
 
export default Device;