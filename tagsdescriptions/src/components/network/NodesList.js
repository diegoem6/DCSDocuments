import React, {useEffect, useContext, Fragment, useState} from 'react';
import ReactPaginate from 'react-paginate';
import assetContext from '../../context/asset/assetContext';
import networkContext from '../../context/network/networkContext';
import NetworkNode from './networkNode';


const NodesList = () => {

    const aContext = useContext(assetContext)
    const {asset} = aContext

    const nContext = useContext(networkContext)
    const {getNetworkNodes, networkNodes} = nContext
    
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
        const listNetworkNodes = ()=>{
            if (asset){
                console.log(asset[0]._id)
                getNetworkNodes(asset[0]._id)
            }
        }
        listNetworkNodes()
        // eslint-disable-next-line
    }, [asset])

    useEffect(() => {
        if (asset){
            setPag(
                {...pag,
                    pageCount: Math.ceil(networkNodes.length/pag.perPage),
                    data:networkNodes,
                    offset:0,
                    currentPage:0
                })
         
        }
        // eslint-disable-next-line
    }, [networkNodes])

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
            <h2>Nodos de red para el asset: {asset[0].name}</h2>
            <ul>
                {(networkNodes.length===0)?
                    (<li className="tarea"><p>No hay nodos de red asociados el asset seleccionado</p></li>)
                :
                    pag.data.slice(pag.offset,pag.offset+pag.perPage).map(nn =>(
                        <NetworkNode
                            networkNode={nn}
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
 
export default NodesList;