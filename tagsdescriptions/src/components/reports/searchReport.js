import React, { useContext, useState, useEffect } from 'react';
import reportContext from '../../context/report/reportContext';
import systemContext from '../../context/system/systemContext';

const SearchReport = () => {
    
    const rContext = useContext(reportContext);
    const { showForm, searchReports, urlDoc, deselectReport } = rContext;

    const sContext = useContext(systemContext);
    const { systemSelected } = sContext;

    const [search, setSearch] = useState('');

    useEffect(() => {
        setSearch('');
        // eslint-disable-next-line
    }, [systemSelected]);

    useEffect(() => {
        if (urlDoc) {
            window.open(`../../../files/${urlDoc}`, '_blank');
        }
    }, [urlDoc]);

    if (!systemSelected) return null;

    const onClickNewReport = () => {
        deselectReport();
        showForm();
    };

    const onChange = (e) => {
        setSearch(e.target.value);
        searchReports(e.target.value);
    };

    return (
        <div className="formulario">
            <div className="contenedor-input">
                <input
                    type="text"
                    className="input-text"
                    placeholder="Buscar reporte"
                    name="search"
                    value={search}
                    onChange={onChange}
                />
            </div>
            <div className="contenedor-input">
                <button
                    type="button"
                    className="btn btn-secundario btn-submit btn-block"
                    onClick={onClickNewReport}
                >
                    Nuevo reporte
                </button>
            </div>
        </div>
    );
};

export default SearchReport;
