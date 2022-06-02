import React, {useEffect, useContext, Fragment, useState} from 'react';
import ReactPaginate from 'react-paginate';
import assetContext from '../../context/asset/assetContext';
import deviceContext from '../../context/devices/devicesContext';
import Device from './device';


const DevicesList = () => {

    const aContext = useContext(assetContext)
    const {asset} = aContext

    const dContext = useContext(deviceContext)
    const {getDevices, devicesSearch} = dContext
    
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
        const listDevices = ()=>{
            if (asset){
                getDevices(asset[0]._id)
            }
        }
        listDevices()
        // eslint-disable-next-line
    }, [asset])

    useEffect(() => {
        if (asset){
            setPag(
                {...pag,
                    pageCount: Math.ceil(devicesSearch.length/pag.perPage),
                    data:devicesSearch,
                    offset:0,
                    currentPage:0
                })
         
        }
        // eslint-disable-next-line
    }, [devicesSearch])

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
            <h2>Dispositivos para el asset: {asset[0].name}</h2>
            <ul>
                {(devicesSearch.length===0)?
                    (<li className="tarea"><p>No hay nodos de red asociados el asset seleccionado</p></li>)
                :
                    pag.data.slice(pag.offset,pag.offset+pag.perPage).map(nn =>(
                        <Device
                            device={nn}
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
 
export default DevicesList;