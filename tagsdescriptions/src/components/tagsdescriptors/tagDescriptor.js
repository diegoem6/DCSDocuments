import React, {useContext} from 'react';
import { Link } from 'react-router-dom'
import tagDescriptorContext from "../../context/tagdescriptor/tagDescriptorContext";

const TagDescriptor = ({tagdescriptor}) => {

    const tContext = useContext(tagDescriptorContext)
    const {deleteTagDescriptor, selectTagDescriptor, showForm} = tContext
    const editTagDescriptor = (tagdescriptor)=>{
        selectTagDescriptor(tagdescriptor._id);
        showForm();
    }
    const showTagDescriptor = (tagdescriptor)=>{
    }

    const deleteTagDescriptorOnCick = (tagdescriptor) =>{
        deleteTagDescriptor(tagdescriptor._id)
    }

    return ( 
        <li className="tarea sombra">
            <p>{tagdescriptor.tagname} </p>

            <div className="acciones">
                
               
                <Link 
                    target='_blank'
                    to={`/showTagDescriptor/${tagdescriptor.tagname}`}
                    className="btn btn-primario">
                    Ver
                </Link>
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick = {()=>{editTagDescriptor(tagdescriptor)}}
                >Editar </button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=> {deleteTagDescriptorOnCick(tagdescriptor)}}
                >Eliminar</button>
            </div>
        </li> 
    

     );
}
 
export default TagDescriptor;