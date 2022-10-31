import React, {useContext} from 'react';
import assetContext from '../../context/asset/assetContext';
//import networkContext from '../../context/network/networkContext';
import iocardContext from '../../context/iocards/iocardsContext';

const HeaderIOCards = () => {
    
    const iContext = useContext(iocardContext);
    const {showForm} = iContext

    const asContext = useContext(assetContext)
    const {asset} = asContext

    if (!asset) return null
    
    const onClickNewIOCard = ()=>{
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
                        onClick = {onClickNewIOCard}
                    >Nueva Tarjeta</button>
            </div>
            
       </div>
    );
}
 
export default HeaderIOCards;