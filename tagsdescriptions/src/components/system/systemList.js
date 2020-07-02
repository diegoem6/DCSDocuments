import React, {useContext, Fragment} from 'react';
import systemContext from '../../context/system/systemContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import System from './system';
import { confirmAlert } from 'react-confirm-alert';
import assetContext from '../../context/asset/assetContext';


const SystemList = () => {

    const sContext = useContext(systemContext)
    const {systems} = sContext
    const aContext = useContext(assetContext)
    const {asset,deleteAsset} = aContext


    if(!asset) {
        return <h2>Seleccione un asset</h2>
    }
    const [assetSelected] = asset

    const deleteAssetOnClick = ()=>{
        deleteAsset(assetSelected)
    }

    const showDialogConfirm = ()=>{
        confirmAlert({
            title: 'Eliminar asset',
            message: 'Se eliminaran todos los sistemas y descriptores asociados al asset',
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteAssetOnClick()
              },
              {
                label: 'No',
                onClick: () => console.log("no")
              }
            ]
          });
    }
    
    return ( 
        <Fragment>
            <h2>Sistemas asignados al asset: {asset.name}</h2>
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
                onClick={showDialogConfirm}
            >Eliminar Asset &times;</button>
        </Fragment>
     );
}
 
export default SystemList;