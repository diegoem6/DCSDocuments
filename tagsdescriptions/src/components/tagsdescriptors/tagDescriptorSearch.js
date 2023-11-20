import React, {Fragment, useContext, useState, useEffect} from 'react';
import tagDescriptorContext from "../../context/tagdescriptor/tagDescriptorContext";
import systemContext from '../../context/system/systemContext';
import { confirmAlert } from 'react-confirm-alert';
import ModalCard from './ModalCard';


//import 'react-confirm-alert/src/react-confirm-alert.css';

const TagDescriptor = ({tagdescriptor}) => {
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

    const toggleModal = () => {
        setModalOpen(!modalOpen);
      };

    const deleteTagDescriptorOnCick = () =>{
        deleteTagDescriptor(tagdescriptor._id)
    }
    
    const showAlarmayEventoOnClick = () => {
        localStorage.setItem('tagdescriptorID',tagdescriptor._id) //guardo en el localstorage una variable tagdescriptorID con el dato tagdescriptor._id
        //getAlarmayEventos(tagdescriptor._id)
        //props.history.push('/events')
        window.open('/events') // /events esta definido en app.js
    }
   
    const showDialogConfirm = ()=>{
        confirmAlert({
            title: 'Confirmar',
            message: '¿Estás seguro de eliminar el descriptor?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteTagDescriptorOnCick()
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
            
                <ModalCard 
                    isOpen={modalOpen} 
                    toggle={toggleModal} 
                    tagdescriptor={tagdescriptor}
                />
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
 
export default TagDescriptor;