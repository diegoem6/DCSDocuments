import React,{Fragment, useState, useContext, useEffect} from 'react';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext' 
import systemContext from '../../context/system/systemContext' 
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { UPDATE_TAGDESCRIPTOR } from '../../types';
import alertContext from '../../context/alerts/alertContext';
import SearchTagDescriptor from './searchTagDescriptor';

const NewTagDescriptor = () => {
    
    const tdContext = useContext(tagDescriptorContext)
    const {tagname_ok, message, createTagDescriptor, showError, tagdescriptor, updateTagDescriptor, validateTagname} = tdContext

    const sContext = useContext(systemContext)
    const {systemSelected} = sContext

    const aContext = useContext(alertContext)
    const {showAlert} = aContext


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

    const onBlurTagDescriptor = (e)=>{
        if (!(tagdescriptor !== null && tagdescriptor.length>0)){
            validateTagname (e.target.value);
        }
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
            showAlert('Debe completar tagname y descripción','alerta-error')
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
            
            if(tagname_ok === false){
                
                if (message){
                    showAlert(message.msg,message.category)
                }else{
                    showAlert("El tag descriptor para ese tagname ya existe","alerta-error")
                }
                return;
            }
            createTagDescriptor(newTagDescriptor)

        }
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
                            readOnly = {(tagdescriptor !== null && tagdescriptor.length>0)}
                            onBlur = {onBlurTagDescriptor}
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
                
        </Fragment>
     );
}
 
export default NewTagDescriptor;