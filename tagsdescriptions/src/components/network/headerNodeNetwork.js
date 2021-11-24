import React, {useContext, useState, useEffect} from 'react';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext' 
import assetContext from '../../context/asset/assetContext';
import systemContext from '../../context/system/systemContext';
import { useHistory } from "react-router-dom";
import networkContext from '../../context/network/networkContext';


const HeaderNodeNetwork = () => {
    const history = useHistory();
    
    const asContext = useContext(networkContext)
    const {showForm} = asContext

    const sContext = useContext(systemContext)
    const {systemSelected} = sContext

    const aContext = useContext(assetContext)
    const {asset} = aContext

    
    const [search, setSearch ] = useState('')

    
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