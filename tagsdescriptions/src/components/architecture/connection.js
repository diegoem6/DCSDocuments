import React, { useContext } from 'react';
import connectionContext from '../../context/connection/connectionContext'
import { confirmAlert } from 'react-confirm-alert';

const Connection = ({connection}) => {

    const cContext = useContext(connectionContext)
    const {deleteConnection} = cContext

    const deleteConnectionOnClick = ()=>{
        deleteConnection(connection._id)
    }

    const showDialogConfirm = ()=>{
        confirmAlert({
            title: 'Eliminar conexión',
            message:  `Se eliminará lka conexión`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteConnectionOnClick()
              },
              {
                label: 'No',
                onClick: () => console.log("no")
              }
            ]
          });
    }


// <li className="tarea sombra">
//     <p>PMSWSY001A</p>
//     <p>251C1A</p>
//     <button
//         type="button"
//         className="btn btn-secundario"
//     >Eliminar</button>
// </li>
// <li className="tarea sombra">
//     <p>PMSWSY001</p>
//     <p>251C1</p>
//     <button
//         type="button"
//         className="btn btn-secundario"
//     >Eliminar</button>
// </li>

    return ( 
        <li className="tarea sombra">
        <p>{connection.source}</p>
        <p>{connection.target}</p>
        <div className="acciones">
            <button
                type="button"
                className="btn btn-secundario"
                onClick={showDialogConfirm}
            >Eliminar</button>
        </div>
    </li> 
     );
}
 
export default Connection;