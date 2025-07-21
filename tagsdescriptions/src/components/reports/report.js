import React, { useContext } from 'react';
import reportContext from "../../context/report/reportContext";
import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Descomentá si lo usás local

const Report = ({ report }) => {
    const rContext = useContext(reportContext);
    const { deleteReport, selectReport, showForm } = rContext;

    const editReport = () => {
        selectReport(report._id);
        showForm();
    };

    const deleteReportOnClick = () => {
        deleteReport(report._id);
    };
       
    const executeReportOnClick = () => {
        localStorage.setItem('reportID',report._id) //guardo en el localstorage una variable reportID con el dato report._id
        //getExecuteReport(report._id)
        //props.history.push('/events')
        window.open('/executeReports') // /executeReports esta definido en app.js
    }

    const showDialogConfirm = () => {
        confirmAlert({
            title: 'Confirmar',
            message: '¿Estás seguro de eliminar el reporte?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: deleteReportOnClick
                },
                {
                    label: 'No',
                    onClick: () => console.log("Cancelado")
                }
            ]
        });
    };

    return (
        <li className="tarea sombra">
            <p><strong>{report.name}</strong></p>
            <p><small>{report.datasource}</small></p>
            
            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-terciario"
                    onClick = {()=>{executeReportOnClick(report)}}
                > Ejecutar Reporte </button>

                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={editReport}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={showDialogConfirm}
                >Eliminar</button>
            </div>
        </li>
    );
};

export default Report;
