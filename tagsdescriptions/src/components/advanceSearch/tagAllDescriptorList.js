import React, {useEffect, useContext, Fragment, useState} from 'react';
import TagDescriptor from './tagDescriptorSearch'
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom'


const TagAllDescriptorList = () => {
   
    
    const tContext = useContext(tagDescriptorContext)
    const {searchtagdescriptors, getAllTagDescriptor} = tContext
    

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
           // if (systemSelected){
            getAllTagDescriptor()
           // }
        }
        listTagsDescriptors()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
       // if (systemSelected){
            setPag(
                {...pag,
                    pageCount: Math.ceil(searchtagdescriptors.length/pag.perPage),
                    data:searchtagdescriptors,
                    offset:0,
                    currentPage:0
                })
            
        //}
        // eslint-disable-next-line
    }, [searchtagdescriptors])

    /*if(!systemSelected) {
        return <h2>Seleccione un sistemaAA</h2>
    }
    
    if (!searchtagdescriptors){
        return <p>No hay documentos para el sistema seleccionado</p>
    }*/
   
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
            <h2>Buscar Tags descriptors </h2>
            <ul>
                {(searchtagdescriptors.length===0)?
                    (<li className="tarea"><p>No hay documentos para mostrar</p></li>)
                :
                    pag.data.slice(pag.offset,pag.offset+pag.perPage).map((tgd)=>{
                     
                        return(
                        
                        <TagDescriptor
                            tagdescriptor={tgd}
                            
                            key={tgd._id}
                           
                        />
                    )})
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
            <Link 
                to={'/menu'}
                className="link-menu">
                &#60;
                Menu
            </Link>
        </Fragment>
     );
}
 
export default TagAllDescriptorList;