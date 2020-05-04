import React,{Fragment, useState, useContext, useEffect} from 'react';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext' 
import systemContext from '../../context/system/systemContext' 
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { UPDATE_TAGDESCRIPTOR } from '../../types';

const NewTagDescriptor = () => {
    
    const tdContext = useContext(tagDescriptorContext)
    const {error, createTagDescriptor, showError, tagdescriptor, updateTagDescriptor} = tdContext

    const sContext = useContext(systemContext)
    const {systemSelected} = sContext

    const [tagname, setTagname] = useState('')
    const [description, setDescription] = useState('')
    
        
        
 
    useEffect(() => {
        if (tagdescriptor !== null && tagdescriptor.length>0){
            const [currentTagDescriptor] = tagdescriptor
            setTagname(currentTagDescriptor.tagname)
            setDescription(currentTagDescriptor.description)
            
        }else{
            setTagname('')
            setDescription('')
        }
    }, [])

    if (!systemSelected) return null

    const onChangeTagDescriptor = (e)=>{
        setTagname(e.target.value)
    }

    const onChangeRichText = (value)=>{
        setDescription(value)
    }

    const onSubmitTagDescriptor = (e)=>{
        e.preventDefault();

        //hacer validaciones y reseteo de form
        if (tagname.trim() === '' || description.trim()===''){
            //alert(description.trim())
            //alert(tagname.trim())
            showError()
            return;
        }

        // llamo a agregar proyecto
        let newTagDescriptor = {}
        newTagDescriptor.tagname = tagname
        newTagDescriptor.description = description
        newTagDescriptor.system = systemSelected._id
        

        if (tagdescriptor !== null && tagdescriptor.length>0){
            const [currentTagDescriptor] = tagdescriptor
            newTagDescriptor._id = currentTagDescriptor._id
            updateTagDescriptor(newTagDescriptor)    
        }else{
            createTagDescriptor(newTagDescriptor)
        }
        
        setDescription("")
        setTagname("")
    }
    return ( 
        <Fragment>
                <h2>Nuevo tags descriptor en el sistema: {systemSelected.name}</h2>
                    <form   
                        className="formulario-nuevo-proyecto"
                        onSubmit = {onSubmitTagDescriptor}
                        >
                        <input  
                            type="text"
                            className="input-text"
                            placeholder="Tag name"
                            name="tagname"
                            value ={tagname}
                            onChange = {onChangeTagDescriptor}
                        />
                        
                        <SunEditor 
                            placeholder="descripción del tag"
                            name="description"
                            setOptions={{
                                height: 300}}
                            setContents ={description}
                            onChange = {onChangeRichText}
                        /> 
                        {/* <textarea 
                            name="description"
                            value ={description}
                            onChange = {onChangeTagDescriptor}
                        > 

                        </textarea>*/}
                        {(tagdescriptor !== null && tagdescriptor.length>0) ?
                    
                            (<input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value = "Guardar Tag"
                            /> )
                            :
                            (<input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value = "Agregar Tag"
                            /> )
                        }
                          
                    </form>
                {error? <p className="mensaje error">El nombre del formulario no puede estar vacío</p> : null}
        </Fragment>
     );
}
 
export default NewTagDescriptor;