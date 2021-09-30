import React, {useContext, useState, useEffect} from 'react';
import assetContext from '../../context/asset/assetContext';
import { useHistory } from "react-router-dom";
import networkContext from '../../context/network/networkContext';


const HeaderNodeNetwork = () => {
    const history = useHistory();
    
    const nContext = useContext(networkContext)
    const {showForm} = nContext


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
                    >Nuevo Nodo</button>
            </div>
            
       </div>
    );
}
 
export default HeaderNodeNetwork;