import React, {useContext, Fragment} from 'react';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext' 


const SearchTagDescriptor = () => {
    
    const tdContext = useContext(tagDescriptorContext)
    const {showForm} = tdContext

    const onClickNewTagDescription = ()=>{
        showForm()
    }
    const onClickNewSearch = ()=>{

    }
    return (  
        <Fragment>
            <input 
                type="text"
                name="searchText"
            />
            <button
                    type="button"
                    className="btn btn-primario"
                    onClick = {onClickNewSearch}
                >Buscar tag</button>
            <button
                    type="button"
                    className="btn btn-primario"
                    onClick = {onClickNewTagDescription}
                >Nuevo tag descriptor</button>
       </Fragment>
    );
}
 
export default SearchTagDescriptor;