import React, { Fragment, useState, useContext, useEffect } from 'react';
import reportContext from '../../context/report/reportContext';
import systemContext from '../../context/system/systemContext';
import alertContext from '../../context/alerts/alertContext';
import 'suneditor/dist/css/suneditor.min.css';

const NewReport = () => {
    const rContext = useContext(reportContext);
    const {
        reportname_ok, message, createReport, report, resetMessage, updateReport, validateReportName,
    } = rContext;

    const sContext = useContext(systemContext);
    const { systemSelected } = sContext;

    const aContext = useContext(alertContext);
    const { showAlert } = aContext;

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [datasource, setDatasource] = useState('');
    const [query, setQuery] = useState('');
    const [icon, setIcon] = useState('');
 
    useEffect(() => {
    if (Array.isArray(report) && report.length > 0) {
        const [currentReport] = report;
        setUser(currentReport.user || '');
        setPassword(currentReport.password || '');
        setName(currentReport.name || '');
        setDatasource(currentReport.datasource || '');
        setQuery(currentReport.query || '');
        } else {
            setUser('');
            setPassword('');
            setName('');
            setDatasource('');
            setQuery('');
        }
        // eslint-disable-next-line
    }, [report]);

    useEffect(() => {
        if (message) {
            showAlert(message.msg, message.category);
            setIcon(message.category === "alerta-error" ? '-red' : '');
            resetMessage();
        }
        // eslint-disable-next-line
    }, [message]);

    if (!systemSelected) return null;
    const onChangeUser = (e) => setUser(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangeName = (e) => setName(e.target.value);
    const onChangeDatasource = (e) => setDatasource(e.target.value);
    const onChangeQuery = (e) => setQuery(e.target.value);

    const onBlurName = () => {
        if (!(report !== null && report.length > 0)) {
            validateReportName(name);
        }
        setIcon('');
    };

    const onSubmitReport = (e) => {
        e.preventDefault();

        if (user.trim() === ''||password.trim() === '' || name.trim() === '' || datasource.trim() === '' || query.trim() === '') {
            showAlert('Debe completar todos los campos', 'alerta-error');
            return;
        }

        const newReport = {
            user,
            password,
            name: name.toUpperCase(),
            datasource,
            query
        };

        if (report !== null && report.length > 0) {
            newReport._id = report[0]._id;
            updateReport(newReport);
        } else {
            if (reportname_ok === false) {
                showAlert(message?.msg || "El reporte con ese nombre ya existe", "alerta-error");
                resetMessage();
                return;
            }
            createReport(newReport);
        }
    };


    return (
        <Fragment>
            <h2>Nuevo Reporte en el sistema: {systemSelected.name}</h2>
            <div className="formDescriptor">
                <div className="descriptor">
                    <form className="formulario-nuevo-proyecto" onSubmit={onSubmitReport}>
                        
                        <input
                            type="text"
                            className={`input-text${icon}`}
                            placeholder="Nombre del reporte"
                            name="name"
                            value={name}
                            onChange={onChangeName}
                            readOnly={report !== null && report.length > 0}
                            onBlur={onBlurName}
                        />
                        <input
                            type="text"
                            className={`input-text${icon}`}
                            placeholder="Nombre del usuario"
                            name="user"
                            value={user}
                            onChange={onChangeUser}
                        />
                        <input
                            type="password"
                            className={`input-text${icon}`}
                            placeholder="Contraseña del usuario"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                        />
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Origen de datos (datasource)"
                            name="datasource"
                            value={datasource}
                            onChange={onChangeDatasource}
                        />
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Consulta (query)"
                            name="query"
                            value={query}
                            onChange={onChangeQuery}
                        />
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value={(report !== null && report.length > 0) ? "Guardar Reporte" : "Agregar Reporte"}
                        />
                    </form>
                </div>             
            </div>
        </Fragment>
    );
};

export default NewReport;
