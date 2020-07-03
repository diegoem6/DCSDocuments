import React, {useContext, useState, useEffect} from 'react';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext' 
import systemContext from '../../context/system/systemContext';
import { useHistory } from "react-router-dom";


const SearchTagDescriptor = () => {
    const history = useHistory();
    
    const tdContext = useContext(tagDescriptorContext)
    const {showForm, searchTagsDescriptors, createDocument, urlDoc} = tdContext

    const sContext = useContext(systemContext)
    const {systemSelected} = sContext

    
    const [search, setSearch ] = useState('')

    useEffect(() => {
        setSearch('')
        // eslint-disable-next-line
    }, [systemSelected])

    useEffect(() => {
        if(urlDoc){
            history.push(`../../../files/${urlDoc}`)
        }    
    }, [urlDoc])
    
    
    if (!systemSelected) return null


   

    const onClickNewTagDescription = ()=>{
        showForm()
    }
    const onClickCreateDocument = async ()=>{
        createDocument(systemSelected._id)
    }
    
    const onChange = (e)=>{
        setSearch(e.target.value)
        searchTagsDescriptors(e.target.value)
    }
    return (  
        <div className="formulario">
            <div 
                className="contenedor-input">
                <input 
                    type="text"
                    className="input-text"
                    placeholder="buscar tag descriptor"
                    name="search"
                    value={search}
                    onChange = {onChange}
                />
            </div>
            <div 
                className="contenedor-input"
            >
                <button
                        type="button"
                        className="btn btn-secundario btn-submit btn-block"
                        onClick = {onClickNewTagDescription}
                    >Nuevo tag descriptor</button>
            </div>
            <div 
                className="contenedor-input"
            >
                

                
                <button
                        type="button"
                        className="btn btn-secundario btn-submit btn-block"
                        onClick = {onClickCreateDocument}
                    >Generar documento</button>
            </div>
       </div>
    );
}
 
export default SearchTagDescriptor;