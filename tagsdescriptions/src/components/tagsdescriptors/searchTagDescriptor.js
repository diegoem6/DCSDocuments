import React, {useContext, useState} from 'react';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext' 
import systemContext from '../../context/system/systemContext';


const SearchTagDescriptor = () => {
    
    const tdContext = useContext(tagDescriptorContext)
    const {showForm, searchTagsDescriptors} = tdContext

    const sContext = useContext(systemContext)
    const {systemSelected} = sContext

    
    const [search, setSearch ] = useState('')


    if (!systemSelected) return null


    const onClickNewTagDescription = ()=>{
        showForm()
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
                className="contenedor-input">
                <button
                        type="button"
                        className="btn btn-secundario btn-submit btn-block"
                        onClick = {onClickNewTagDescription}
                    >Nuevo tag descriptor</button>
            </div>
       </div>
    );
}
 
export default SearchTagDescriptor;