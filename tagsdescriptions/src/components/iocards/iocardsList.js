import React, {useEffect, useContext, Fragment, useState} from 'react';
import ReactPaginate from 'react-paginate';
import assetContext from '../../context/asset/assetContext';

import iocardContext from '../../context/iocards/iocardsContext';
import IOCard from '../../components/iocards/iocard'

const IOCardsList = () => {

    const aContext = useContext(assetContext)
    const {asset} = aContext
    
    const iContext = useContext(iocardContext)
    const {getIOCards, iocardsSearch} = iContext

    // const tContext = useContext(tagDescriptorContext)
    // const {searchtagdescriptors, getTagsDescriptors} = tContext

    const [pag, setPag] = useState(
            {
                offset:0,
                perPage:10,
                currentPage:0,
                pageCount:0,
                data:[]
            })
    

    useEffect(() => {
        const listIOCards = ()=>{
            if (asset){
                getIOCards(asset[0]._id)
            }
        }
        listIOCards()
        // eslint-disable-next-line
    }, [asset])

    useEffect(() => {
        if (asset){
            setPag(
                {...pag,
                    pageCount: Math.ceil(iocardsSearch.length/pag.perPage),
                    data:iocardsSearch,
                    offset:0,
                    currentPage:0
                })
         
        }
        // eslint-disable-next-line
    }, [iocardsSearch])

    if(!asset) {
        return <h2>Seleccione un asset</h2>
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
            <h2>Tarjetas IO para el asset: {asset[0].name}</h2>
            <ul>
                {(iocardsSearch.length===0)?
                    (<li className="tarea"><p>No hay tarjetas IO asociadas al asset seleccionado</p></li>)
                :
                    pag.data.slice(pag.offset,pag.offset+pag.perPage).map(nn =>(
                        <IOCard
                            iocard={nn}
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
 
export default IOCardsList;