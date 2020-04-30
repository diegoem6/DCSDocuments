import React, { useContext } from 'react';
import systemContext from '../../context/system/systemContext'

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
                onClick={deleteSystemOnClick}
            >Eliminar</button>
        </div>
    </li> 
     );
}
 
export default System;