import React,{Fragment, useState, useContext, useEffect} from 'react';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext' 
import systemContext from '../../context/system/systemContext' 
import SunEditor,{buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import alertContext from '../../context/alerts/alertContext';
//import Files from 'react-files'

const NewTagDescriptor = () => {
    
    const tdContext = useContext(tagDescriptorContext)
    const {tagname_ok, message, createTagDescriptor, tagdescriptor, related, interlocks, resetMessage, updateTagDescriptor, validateTagname, getTagDescriptorsRelated, selectOnlyDescriptor, getInterlocks} = tdContext

    const sContext = useContext(systemContext)
    const {systemSelected} = sContext

    const aContext = useContext(alertContext)
    const {showAlert} = aContext


    const [tagname, setTagname] = useState('')
    const [description, setDescription] = useState('')
    // TODO: attachments
    // const [attachments, setattachments] = useState({
    //     files:[]
    // })
    
    const [icon, seticon] = useState('')
      
 
    useEffect(() => {
        if (tagdescriptor !== null && tagdescriptor.length>0){
            const [currentTagDescriptor] = tagdescriptor
            setTagname(currentTagDescriptor.tagname)
            setDescription(currentTagDescriptor.description)
            getTagDescriptorsRelated(currentTagDescriptor._id)
            getInterlocks(currentTagDescriptor)
        }else{
            setTagname('')
            setDescription('')
        }
        // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
        if (tagdescriptor !== null && tagdescriptor.length>0){
            const [currentTagDescriptor] = tagdescriptor
            setTagname(currentTagDescriptor.tagname)
            setDescription(currentTagDescriptor.description)
            getTagDescriptorsRelated(currentTagDescriptor._id)
            getInterlocks(currentTagDescriptor)
        }else{
            setTagname('')
            setDescription('')
        }
        // eslint-disable-next-line
    }, [tagdescriptor])

      
    useEffect(() => {
        if (message){
            showAlert(message.msg,message.category)
            console.log(message.category)
            if(message.category==="alerta-error"){
                seticon('-red')
            }
            else{
                seticon('')
            }
            resetMessage();
        }
        // eslint-disable-next-line
    }, [message])

    // useEffect(() => {
    //     if (interlocks){
    //         console.log(interlocks)
    //         if (interlocks[0]){
    //             //interlocks[0].map(i => console.log(i.interlock))
    //             interlocks[0].map(i => console.log(i.Interlock))
    //         }
    //     }else{
    //         console.log("no hay nada")
    //     }
    // }, [interlocks])

    if (!systemSelected) return null


    const onChangeTagDescriptor = (e)=>{
        setTagname(e.target.value)
    }

    const onBlurTagDescriptor = (e)=>{
        if (!(tagdescriptor !== null && tagdescriptor.length>0)){
            validateTagname (e.target.value);
        }
        seticon('')
    }

    const onChangeRichText = (value)=>{
        setDescription(value)
    }

    const goToRelated = (tagdescriptor_related)=>{
        selectOnlyDescriptor(tagdescriptor_related);
        setTagname(tagdescriptor_related.tagname)
        setDescription(tagdescriptor_related.description)
        getTagDescriptorsRelated(tagdescriptor_related._id)
        //showForm();
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
        newTagDescriptor.tagname = tagname.toUpperCase()
        newTagDescriptor.description = description
        newTagDescriptor.system = systemSelected._id
        
        
        //TODO: attachmentss
        //newTagDescriptor.attachments = attachments

        if (tagdescriptor !== null && tagdescriptor.length>0){
            const [currentTagDescriptor] = tagdescriptor
            newTagDescriptor._id = currentTagDescriptor._id
            updateTagDescriptor(newTagDescriptor)  
        }else{
            
            if(tagname_ok === false){
                
                if (message){
                    showAlert(message.msg,message.category)
                    resetMessage()
                }else{
                    showAlert("El tag descriptor para ese tagname ya existe","alerta-error")
                }
                return;
            }
            createTagDescriptor(newTagDescriptor)

        }
    }

    // TODO: attachments
    // const onFilesChange = (files) => {
    //     console.log(files)
    //     console.log(files.type)
    //     setattachments({...attachments,
    //             files:files})
    // }
    
    // const onFilesError = (error, file) => {
    //     console.log('error code ' + error.code + ': ' + error.message)
    // }
    
    return ( 
        <Fragment>
                <h2>Tag descriptor en el sistema: {systemSelected.name}</h2>
                <div className="formDescriptor">
                    <div className="descriptor">
                        <form   
                            className="formulario-nuevo-proyecto"
                            onSubmit = {onSubmitTagDescriptor}
                            >
                            <input  
                                type="text"
                                className={`input-text${icon}`}
                                placeholder="Tag name"
                                name="tagname"
                                value ={tagname}
                                onChange = {onChangeTagDescriptor}
                                readOnly = {(tagdescriptor !== null && tagdescriptor.length>0)}
                                onBlur = {onBlurTagDescriptor}
                            />
                            
                            {/* TODO: cambio de editor */}
                            <SunEditor 
                                placeholder="descripción del tag"
                                name="description"
                                setOptions={{
                                    height: 300,
                                    buttonList: buttonList.complex 
                                }}
                                setContents ={description}
                                onChange = {onChangeRichText}
                                showToolbar={true}
                                
                            /> 
                            
                            {/* <Editor
                                initialValue={description}
                                tinymceScriptSrc='/public/js/tinymce/tinymce.min.js'
                                init={{
                                height: 500,
                                menubar: 'file edit view insert format tools table help',
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                                toolbar_sticky: true,
                                paste_retain_style_properties: "all"
                                }
                                }
                                onEditorChange={onChangeRichText}
                            /> 
                            <Editor
                                initialValue={description}
                                apiKey='ak1az6sw8c9hjvqp8qt932v5wkgl29teq3qoys34bf11cjvo'
                                tinymceScriptSrc='/js/tinymce/tinymce.min.js'
                                init={{
                                height: 500,
                                menubar: 'file edit view insert format tools table help',
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                                toolbar_sticky: true,
                                paste_retain_style_properties: "all"
                                }
                                }
                                onEditorChange={onChangeRichText}
                            />
                                */}


                            {/* TODO: attachments 
                            <Files
                                className='files-dropzone'
                                onChange={onFilesChange}
                                onError={onFilesError}
                                accepts={['image/png', '.jpg', '.pdf', 'audio/*']}
                                multiple
                                maxFiles={3}
                                maxFileSize={10000000}
                                minFileSize={0}
                                clickable
                                >
                                Drop files here or click to upload
                            </Files>
                            */}
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
                    </div>
                    {
                    (tagdescriptor !== null && tagdescriptor.length>0)  &&
                            (
                                <div className="descriptorsRelated">
                                    {
                                        (related != null) ? 
                                            (<p><b>Descriptores relacionados</b></p>)
                                            :
                                            (null)
                                    }
                                    <ul>
                                    {
                                        (related != null && related.length != 0) ?
                                        (
                                            related.map( r => 
                                                    (<li className="itemRelated">
                                                        <a onClick={()=>{goToRelated(r)}}> {r.tagname} </a>
                                                    </li>  
                                                    )
                                                )
                                        ): 
                                        (
                                            <li className="itemRelated">
                                                <span>No hay descriptores relacionados</span>
                                            </li>  
                                        )
                                    }
                                    </ul>
                                    {
                                        (interlocks != null) ? 
                                            (<p><b>Interlocks</b></p>)
                                            :
                                            (null)
                                    }
                                    <ul>
                                    {
                                        (interlocks[0] != null) ?
                                        (
                                            interlocks[0].map( r => 
                                                (r.Interlock !== "") ?
                                                    (<li className="itemRelated">
                                                        <span> {r.Interlock} </span>
                                                    </li>  
                                                    ):null
                                            )
                                        ): 
                                        (null)

                                    }
                                    </ul>
                                </div>
                            )
                    }
                    
                    
                </div>
                
        </Fragment>
     );
}
 
export default NewTagDescriptor;