import React, {Fragment, useContext, useState, useEffect} from 'react';
import tagDescriptorContext from "../../context/tagdescriptor/tagDescriptorContext";
import systemContext from '../../context/system/systemContext';
import { useAnalytics } from '../../context/analytics/analyticsContext';

//import 'react-confirm-alert/src/react-confirm-alert.css';

const TagDescriptorSearch = ({tagdescriptor}) => {
    //Estado para ver el modal con la descripción 
    const [modalOpen, setModalOpen] = useState(false);
    
    const { trackUserAction, getUserUsabilityScore } = useAnalytics();
    
    const sContext = useContext(systemContext)
    const{systemAndAssetSelected, getSystemById, selectSystem} = sContext;
    const tContext = useContext(tagDescriptorContext)
    const {deleteTagDescriptor, selectTagDescriptor, showForm} = tContext
    
    const editTagDescriptor = async (tagdescriptor, system) => {
        // Track la acción de edición
        await trackUserAction('edit_tag_descriptor', {
            tagId: tagdescriptor._id,
            systemId: system._id,
            timestamp: new Date()
        });

        // Obtener score de usabilidad
        const usabilityScore = await getUserUsabilityScore();
        
        // Adaptar la interfaz según el score
        if (usabilityScore < 0.5) {
            // Mostrar tooltips y ayuda adicional
            showHelpTooltips();
        }

        selectTagDescriptor(tagdescriptor._id);
        selectSystem(system);
        showForm();
    }

    // Mostrar ayuda contextual basada en el uso
    const showHelpTooltips = () => {
        // Implementar tooltips y guías contextuales
    }
   
    useEffect (()=>{
        if(tagdescriptor){
            getSystemById(tagdescriptor.system)
        }
    },[]) 

 
    
    
   
    
   
    return ( 
        <Fragment>
            
                
         <li className="tarea sombra">
        {systemAndAssetSelected ? <p><span>Nombre:</span> {tagdescriptor.tagname}  |  <span>Asset:</span> {systemAndAssetSelected.assetName} | <span>System:</span> {systemAndAssetSelected.systemName} </p>: null}
       
        <div className="acciones">
                
               {/* <button 
                    type="button"
                    className="btn btn-terciario"
                    onClick={toggleModal}
                > Ver Descripción </button>
    */}
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick = {()=>{editTagDescriptor(tagdescriptor, systemAndAssetSelected)}}
                >Editar </button>                
            </div>
        
    </li> 
        
       
    </Fragment>
     );
}
 
export default TagDescriptorSearch;