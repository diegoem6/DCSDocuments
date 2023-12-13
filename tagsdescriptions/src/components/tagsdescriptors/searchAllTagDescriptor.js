import React, {useContext, useState, useEffect} from 'react';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext' 
import systemContext from '../../context/system/systemContext';
//import { useHistory } from "react-router-dom";


const SearchTagDescriptor = () => {
    
    const tdContext = useContext(tagDescriptorContext)
    const { searchTagsDescriptors,  urlDoc} = tdContext

    const sContext = useContext(systemContext)
    const {systemSelected} = sContext

    
    const [search, setSearch ] = useState('')

    useEffect(() => {
        setSearch('')
        // eslint-disable-next-line
    }, [systemSelected])

    useEffect(() => {
        if(urlDoc){
            window.open(`../../../files/${urlDoc}`,'_blank')
        }    
    }, [urlDoc])
       
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
       </div>
    );
}
 
export default SearchTagDescriptor;