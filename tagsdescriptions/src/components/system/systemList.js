import React, {useEffect, useContext, Fragment} from 'react';
import systemContext from '../../context/system/systemContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import System from './system';
import assetContext from '../../context/asset/assetContext';


const SystemList = () => {

    const sContext = useContext(systemContext)
    const {systems, getSystems} = sContext
    const aContext = useContext(assetContext)
    const {asset,deleteAsset} = aContext

    const onSubmit = ()=>{

    }
    const onChange = ()=>{

    }

    if(!asset) {
        return <h2>Seleccione un asset</h2>
    }
    const [assetSelected] = asset

    const deleteAssetOnClick = ()=>{
        deleteAsset(assetSelected)
    }
    
    return ( 
        <Fragment>
            <h2>Sistemas asignados al asset: {asset.nombre}</h2>
            <ul>
                {(systems.length===0)?
                    (<li className="tarea"><p>No hay sistemas asignados al asset</p></li>)
                :
                <TransitionGroup>
                {systems.map(system => (
                    <CSSTransition
                        key={system._id}
                        timeout={200}
                        classNames="tarea"
                    >
                        <System 
                            system={system}
                        />
                    </CSSTransition>
                ))}
                </TransitionGroup>
                }
            </ul>
            <button     
                type="button"
                className="btn btn-eliminar"
                onClick={deleteAssetOnClick}
            >Eliminar Asset &times;</button>
        </Fragment>
     );
}
 
export default SystemList;