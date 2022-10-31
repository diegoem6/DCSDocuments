import React, {useContext} from 'react';
import devicesContext from "../../context/devices/devicesContext";
import iocardContext from '../../context/iocards/iocardsContext';
import { confirmAlert } from 'react-confirm-alert';


//import 'react-confirm-alert/src/react-confirm-alert.css';

const IOCard = ({iocard}) => {
    
    const dContext = useContext(devicesContext)
    const {deleteDevice, selectDevice} = dContext

    
    const iContext = useContext(iocardContext);
    const {deleteIOCard, selectIOCard, showForm} = iContext

    //console.log(device)
    
    
    const editIOCard = (iocard)=>{ 
        //console.log(iocard)
        selectIOCard(iocard._id);
        //selectDevice(device._id);
        showForm();
    }
    

    const deleteDeviceOnCick = () =>{
        deleteIOCard(iocard._id)
    }


    const showDialogConfirm = ()=>{
        confirmAlert({
            title: 'Confirmar',
            message: '¿Estás seguro de eliminar la tarjeta?',
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
            <p>{iocard.tagname} </p>
            <p>{iocard.typeDesc}</p> 
            <p>{iocard.cabinetDesc}: {iocard.sideLocation}-{iocard.posLocation}</p> 
            <div className="acciones">                
                
                <button
                    type="button"
                    className="btn btn-terciario"
                    onClick={showDialogConfirm}
                >Eliminar</button>
                
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick = {()=>{editIOCard(iocard)}}
                >Editar </button>
                
                {/* <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=>
                        {
                            //lo COMENTE PARA QUE ME FUNCIONE IOCARD
                            //localStorage.setItem('devicestatusID',device._id) //guardo en el localstorage una variable tagdescriptorID con el dato tagdescriptor._id
                            //window.open('/devicestatus') // /events esta definido en app.js
                        }
                        
                    }
                >Status??</button> */}
                
            </div>
        </li> 
    

     );
}
 
export default IOCard;