import React, {useContext} from 'react';
import assetContext from '../../context/asset/assetContext';
import networkContext from '../../context/network/networkContext';


const HeaderNodeNetwork = () => {
    
    const asContext = useContext(networkContext)
    const {showForm} = asContext

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