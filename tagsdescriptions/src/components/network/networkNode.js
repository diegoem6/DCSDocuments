import React, {useContext} from 'react';
import { Link } from 'react-router-dom'
import networkContext from "../../context/network/networkContext";
import { confirmAlert } from 'react-confirm-alert';


//import 'react-confirm-alert/src/react-confirm-alert.css';

const NetworkNode = ({networkNode}) => {
    
    //console.log(networkNode)
    
    const tContext = useContext(networkContext)
    const {deleteNetworkNode, selectNetworkNode, showForm, getNetworkNode} = tContext
    
    const editNetworkNode = (networkNode)=>{ 
        //console.log(networkNode)
        selectNetworkNode(networkNode._id);
        //selectNetworkNode(networkNode._id);
        showForm();
    }
    

    const deleteNetworkNodeOnCick = () =>{
        deleteNetworkNode(networkNode._id)
    }


    const showDialogConfirm = ()=>{
        confirmAlert({
            title: 'Confirmar',
            message: '¿Estás seguro de eliminar el nodo de red?',
            buttons: [
              {
                label: 'Yes',
                /*onClick: () => console.log("si")*/
                onClick: () => deleteNetworkNodeOnCick()
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
            <p>{networkNode.nodeName} </p>
            <p>{networkNode.nodeDescription}</p>
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
                    onClick = {()=>{editNetworkNode(networkNode)}}
                >Editar </button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=>
                        {
                            localStorage.setItem('networkstatusID',networkNode._id) //guardo en el localstorage una variable tagdescriptorID con el dato tagdescriptor._id
                            window.open('/networkstatus') // /events esta definido en app.js
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
 
export default NetworkNode;