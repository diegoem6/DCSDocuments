import React,{Fragment, useState, useContext} from 'react';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext' 
import { Editor } from '@tinymce/tinymce-react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const NewTagDescriptor = () => {
    
    const tdContext = useContext(tagDescriptorContext)
    const {form, error, createTagDescriptor, showError} = tdContext

    const [tagDescriptor, settagDescriptor] = useState({
        tagname:'',
        description:''
    })
    const {tagname,description} = tagDescriptor


    const onChangeTagDescriptor = (e)=>{
        console.log(e.target);
        settagDescriptor({
            ...tagDescriptor, 
            [e.target.name]: e.target.value
        })
    }

    const onChangeRichText = (value)=>{
        settagDescriptor({...tagDescriptor,
            description:value})
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
        
        createTagDescriptor(tagDescriptor)
        settagDescriptor("")
        
    }
    return ( 
        <Fragment>
            {form ?
                (
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
                            value ={description}
                            onChange = {onChangeRichText}
                        />

                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value = "Agregar Tag"
                        />    
                    </form>
                ):
                (null)
                }
                {error? <p className="mensaje error">El nombre del formulario no puede estar vacío</p> : null}
        </Fragment>
     );
}
 
export default NewTagDescriptor;