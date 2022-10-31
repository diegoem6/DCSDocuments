import React, { useContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

import CabinetsContext from '../../context/cabinets/cabinetsContext';
import assetContext from '../../context/asset/assetContext';
import Cabinet from './Cabinet';
const CabinetsList = () => {
    const cabContext = useContext(CabinetsContext)
    const aContext = useContext(assetContext)
    const { asset } = aContext;
    const { cabinets, getCabinets } = cabContext;
    //const [currentPage, setCurrentPage] = useState(1);

    const [pag, setPag] = useState(
        {
            offset: 0,
            perPage: 10,
            currentPage: 0,
            pageCount: 0,
            data: []
        })


    useEffect(() => {
        const listCabinets=()=>{
            if (asset) {
                getCabinets(asset[0]._id)
            }
        }
        listCabinets()
    }, [asset])

    useEffect(() => {
        if (asset) {

            setPag(
                {
                    ...pag,
                    pageCount: Math.ceil(cabinets.length / pag.perPage),
                    data: cabinets,
                    offset: 0,
                    currentPage: 0
                })

        }
    }, [cabinets])


    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * pag.perPage;
        setPag(
            {
                ...pag,
                currentPage: selectedPage,
                offset: offset
            })

    };

    if (!asset) {
        return <h2>Seleccione un asset</h2>
    }
    return (
        <>
            <h2>Lista de Gabinetes para el Asset: {asset[0].name}</h2>
            <ul>
                {(cabinets.length === 0) ?
                    (<li className="tarea"><p>No hay gabinetes asociados el asset seleccionado</p></li>)
                    :
                    pag.data.slice(pag.offset, pag.offset + pag.perPage).map(cab => (
                        <Cabinet
                            key={cab._id}
                            cabinet={cab}
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
                    activeClassName={"active"} />
            </div>
        </ >
    )
}

export default CabinetsList