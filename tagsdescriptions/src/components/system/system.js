import React, { useContext } from 'react';
import systemContext from '../../context/system/systemContext'
import { confirmAlert } from 'react-confirm-alert';

const System = ({system}) => {

    const sContext = useContext(systemContext)
    const {updateSystem, selectSystem, deleteSystem} = sContext

    const updateSystemOnClick = ()=>{
        system.active = !system.active
        updateSystem(system);
    }
    const deleteSystemOnClick = ()=>{
        deleteSystem(system)
    }

    const showDialogConfirm = ()=>{
        confirmAlert({
            title: 'Eliminar sistema',
            message: 'Se eliminaran todos los descriptores asociados al sistema',
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteSystemOnClick()
              },
              {
                label: 'No',
                onClick: () => console.log("no")
              }
            ]
          });
    }

    return ( 
        <li className="tarea sombra">
        <p>{system.name} </p>

        <div className="estado">
            {system.active 
            ?  
                (
                    <button
                        type="button"
                        className="completo"
                        onClick = {()=>updateSystemOnClick ()}
                    >Activo</button>
                )
            : 
                (
                    <button
                        type="button"
                        className="incompleto"
                        onClick = {()=>updateSystemOnClick ()}
                    >Desactivo</button>
                )
            }
        </div>

        <div className="acciones">
            <button 
                type="button"
                className="btn btn-primario"
                onClick = {()=>{selectSystem(system)}}
            >Editar</button>

            <button
                type="button"
                className="btn btn-secundario"
                onClick={showDialogConfirm}
            >Eliminar</button>
        </div>
    </li> 
     );
}
 
export default System;