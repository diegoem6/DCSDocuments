import React, {useEffect, useContext, Fragment, useState} from 'react';
import systemContext from '../../context/system/systemContext'
import TagDescriptor from './tagDescriptor'
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext';
import ReactPaginate from 'react-paginate';



const TagDescriptorList = () => {

    const sContext = useContext(systemContext)
    const {systemSelected} = sContext
    
    const tContext = useContext(tagDescriptorContext)
    const {searchtagdescriptors, getTagsDescriptors} = tContext

    const [pag, setPag] = useState(
            {
                offset:0,
                perPage:10,
                currentPage:0,
                pageCount:0,
                data:[]
            })
    

    useEffect(() => {
        const listTagsDescriptors = ()=>{
            if (systemSelected){
                getTagsDescriptors(systemSelected._id)
            }
        }
        listTagsDescriptors()
        // eslint-disable-next-line
    }, [systemSelected])

    useEffect(() => {
        if (systemSelected){
            setPag(
                {...pag,
                    pageCount: Math.ceil(searchtagdescriptors.length/pag.perPage),
                    data:searchtagdescriptors,
                    offset:0,
                    currentPage:0,
                })
            
        }
        // eslint-disable-next-line
    }, [searchtagdescriptors])

    if(!systemSelected) {
        return <h2>Seleccione un sistema</h2>
    }
    
    if (!searchtagdescriptors){
        return <p>No hay documentos para el sistema seleccionado</p>
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * pag.perPage;
        setPag(
            {...pag,
                currentPage: selectedPage,
                offset:offset
            })

    };

    return ( 
        <Fragment>
            <h2>Tags descriptors del sistema: {systemSelected.name}</h2>
            <ul>
                {(searchtagdescriptors.length===0)?
                    (<li className="tarea"><p>No hay documentos para el sistema seleccionado</p></li>)
                :
                    pag.data.slice(pag.offset,pag.offset+pag.perPage).map(tgd =>(
                        <TagDescriptor
                            tagdescriptor={tgd}
                        />
                    ))
                }
            </ul>
            <div>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pag.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
        </Fragment>
     );
}
 
export default TagDescriptorList;