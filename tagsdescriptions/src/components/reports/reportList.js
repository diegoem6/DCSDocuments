import React, { useEffect, useContext, Fragment, useState } from 'react';
import systemContext from '../../context/system/systemContext';
import reportContext from '../../context/report/reportContext';
import Report from './report';
import ReactPaginate from 'react-paginate';

const ReportList = () => {
    const { systemSelected } = useContext(systemContext);
    const { searchreports, getReports } = useContext(reportContext);

    const [pag, setPag] = useState({
        offset: 0,
        perPage: 10,
        currentPage: 0,
        pageCount: 0,
    });

    useEffect(() => {
        if (systemSelected) {
            getReports(systemSelected._id);
        }
   
    }, [getReports, systemSelected]);

    useEffect(() => {
        if (searchreports) {
            setPag(prev => ({
                ...prev,
                pageCount: Math.ceil(searchreports.length / prev.perPage),
                currentPage: 0,
                offset: 0
            }));
        }
    
    }, [searchreports]);

    const handlePageClick = ({ selected }) => {
        setPag(prev => ({
            ...prev,
            currentPage: selected,
            offset: selected * prev.perPage
        }));
    };

    if (!systemSelected) {
        return <h2>Seleccione un sistema</h2>;
    }

    if (!searchreports || searchreports.length === 0) {
        return <p>No hay reportes para el sistema seleccionado</p>;
    }

    const currentData = searchreports.slice(pag.offset, pag.offset + pag.perPage);

    return (
        <Fragment>
            <h2>Reportes del sistema: {systemSelected.name}</h2>
            <ul>
                {currentData.map(rep => (
                    <Report key={rep._id} report={rep} />
                ))}
            </ul>
            <div>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    pageCount={pag.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </div>
        </Fragment>
    );
};

export default ReportList;
