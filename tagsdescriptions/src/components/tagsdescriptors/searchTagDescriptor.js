import React, {useContext, useState} from 'react';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext' 
import systemContext from '../../context/system/systemContext';


const SearchTagDescriptor = () => {
    
    const tdContext = useContext(tagDescriptorContext)
    const {showForm} = tdContext

    const sContext = useContext(systemContext)
    const {systemSelected} = sContext

    
    const [error, setError ] = useState('')
    const [search, setSearch ] = useState('')


    if (!systemSelected) return null


    const onClickNewTagDescription = ()=>{
        showForm()
    }
    const onClickNewSearch = ()=>{
    }

    const onChange = ()=>{

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
            {error ? <p className="mensaje error">El nombre del sistema es obligatorio</p> : null}
       </div>
    );
}
 
export default SearchTagDescriptor;