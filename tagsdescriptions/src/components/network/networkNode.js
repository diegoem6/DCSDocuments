import React, {useContext} from 'react';
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';


//import 'react-confirm-alert/src/react-confirm-alert.css';

const NetworkNode = ({networkNode}) => {
    
    console.log(networkNode)
    
    return ( 
        <li className="tarea sombra">
            <p>{networkNode.nodeName} </p>

            <div className="acciones">
                
               
                {/* <a 
                    target='_blank'
                    href={`${process.env.REACT_APP_SHOWTAG_URL}/showTagDescriptor/${tagdescriptor.tagname}`}
                    className="btn btn-primario">
                    Ver
                </a> */}
                
                <button 
                    type="button"
                    className="btn btn-primario"
                    //onClick = {()=>{editTagDescriptor(tagdescriptor)}}
                >Editar </button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    //onClick={showDialogConfirm}
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