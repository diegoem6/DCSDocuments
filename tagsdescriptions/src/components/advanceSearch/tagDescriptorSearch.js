import React, {Fragment, useContext, useState, useEffect} from 'react';
import tagDescriptorContext from "../../context/tagdescriptor/tagDescriptorContext";
import systemContext from '../../context/system/systemContext';
import { confirmAlert } from 'react-confirm-alert';


//import 'react-confirm-alert/src/react-confirm-alert.css';

const TagDescriptorSearch = ({tagdescriptor}) => {
    //Estado para ver el modal con la descripción 
    const [modalOpen, setModalOpen] = useState(false);
    
    const sContext = useContext(systemContext)
    const{systemAndAssetSelected, getSystemById, selectSystem} = sContext;
    const tContext = useContext(tagDescriptorContext)
    const {deleteTagDescriptor, selectTagDescriptor, showForm} = tContext
    
    const editTagDescriptor = (tagdescriptor,system)=>{
        selectTagDescriptor(tagdescriptor._id);
        selectSystem(system)
        showForm();
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