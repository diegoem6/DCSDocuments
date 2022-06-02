import React, {useContext} from 'react';
import tagDescriptorContext from "../../context/tagdescriptor/tagDescriptorContext";
import { confirmAlert } from 'react-confirm-alert';


//import 'react-confirm-alert/src/react-confirm-alert.css';

const TagDescriptor = ({tagdescriptor}) => {
    
    const tContext = useContext(tagDescriptorContext)
    const {deleteTagDescriptor, selectTagDescriptor, showForm} = tContext
    const editTagDescriptor = (tagdescriptor)=>{
        selectTagDescriptor(tagdescriptor._id);
        showForm();
    }
    

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
        <li className="tarea sombra">
            <p>{tagdescriptor.tagname} </p>

            <div className="acciones">
                
               
                {/* <a 
                    target='_blank'
                    href={`${process.env.REACT_APP_SHOWTAG_URL}/showTagDescriptor/${tagdescriptor.tagname}`}
                    className="btn btn-primario">
                    Ver
                </a> */}
                <button 
                    type="button"
                    className="btn btn-terciario"
                    onClick = {()=>{showAlarmayEventoOnClick(tagdescriptor)}}
                > Alarmas </button>
                
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick = {()=>{editTagDescriptor(tagdescriptor)}}
                >Editar </button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={showDialogConfirm}
                >Eliminar</button>
                {/* <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={showDialogConfirm}
                >Confirm</button> */}
                
            </div>
        </li> 
    

     );
}
 
export default TagDescriptor;