import React, {useContext, useState, useEffect} from 'react';
import assetContext from '../../context/asset/assetContext';
import { useHistory } from "react-router-dom";
import deviceContext from '../../context/devices/devicesContext';


const HeaderDevice = () => {
    const history = useHistory();
    
    const dContext = useContext(deviceContext)
    const {showForm} = dContext


    const aContext = useContext(assetContext)
    const {asset} = aContext


    
    if (!asset) return null

    const onClickNewNode = ()=>{
        
        showForm();
    }
    
    
    return (  
        <div className="formulario">
            
            <div 
                className="contenedor-input"
            >
                <button
                        type="button"
                        className="btn btn-secundario btn-submit btn-block"
                        onClick = {onClickNewNode}
                    >Nuevo Dispositivo</button>
            </div>
            
       </div>
    );
}
 
export default HeaderDevice;