import React, { useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import Header from '../../layout/header';
import NewReport from './newReport';
import ReportList from './reportList';
import SearchReport from './searchReport';
import SidebarReports from '../../layout/sidebarReportsSearch';
import reportContext from '../../context/report/reportContext';
import systemContext from '../../context/system/systemContext';
import alertContext from '../../context/alerts/alertContext';

const Reports = () => {

    const auContext = useContext(authContext);
    const { getUser } = auContext;

    const rContext = useContext(reportContext);
    const { form } = rContext;

    const sContext = useContext(systemContext);
    const { deselectSystem } = sContext;

    const aContext = useContext(alertContext);
    const { alert } = aContext;

    useEffect(() => {
        getUser();
        deselectSystem();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="contenedor-app">
            {alert ? (
                <div className={`alerta ${alert.category}`}>{alert.msg}</div>
            ) : null}

            <SidebarReports />

            <div className="seccion-principal">
                <Header />

                <main>
                    <SearchReport />

                    <div className="contenedor-tareas">
                        {form ? <NewReport /> : <ReportList />}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Reports;
