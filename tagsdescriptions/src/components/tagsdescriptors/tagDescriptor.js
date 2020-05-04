import React, {useContext} from 'react';
import tagDescriptorContext from "../../context/tagdescriptor/tagDescriptorContext";

const TagDescriptor = ({tagdescriptor}) => {

    const tContext = useContext(tagDescriptorContext)
    const {deleteTagDescription} = tContext
    const selectTagDescriptor = (tagdescriptor)=>{

    }
    const showTagDescriptor = (tagdescriptor)=>{

    }

    return ( 
        <li className="tarea sombra">
            <p>{tagdescriptor.tagname} </p>

            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick = {()=>{showTagDescriptor(tagdescriptor)}}
                >Mostrar</button>

                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick = {()=>{selectTagDescriptor(tagdescriptor)}}
                >Editar </button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={deleteTagDescription}
                >Eliminar</button>
            </div>
        </li> 
    

     );
}
 
export default TagDescriptor;