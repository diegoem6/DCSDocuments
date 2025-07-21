import React, { useReducer } from 'react';
import reportContext from './reportContext';
import reportReducer from './reportReducer';
import {
    FORM_REPORT,
    GET_REPORT,
    CREATE_REPORT,
    SHOW_ERROR_REPORT,
    UPDATE_REPORT,
    SELECT_REPORT,
    DESELECT_REPORT,
    GET_REPORTS,
    GET_ALL_REPORTS,
    DELETE_REPORT,
    SEARCH_REPORTS,
    RESET_REPORT_MESSAGE,
    VALIDATE_REPORT,
    INVALIDATE_REPORT,
    SELECT_ONLY_REPORT,
} from '../../types/index';

import axiosClient from '../../config/axios';

const ReportState = props => {

    const initialState = {
        reports: [],
        searchreports: [],       
        form: false,
        reportname_ok: true,
        report: null,
        related: [],
        message: null,
        urlDoc: null,
        error: false
    };

    const [state, dispatch] = useReducer(reportReducer, initialState);

    const showForm = () => {
        dispatch({ type: FORM_REPORT });
    };

    const getReports = async (system) => {
        try {
            const res = await axiosClient.get('/api/reports', { params: { system } });
            dispatch({
                type: GET_REPORTS,
                payload: res.data.reports
            });
        } catch (error) {
            dispatch({
                type: SHOW_ERROR_REPORT,
                payload: { msg: "Hubo un error buscando los reportes", category: "alerta-error" }
            });
        }
    };

    const searchReports = (search) => {
        dispatch({
            type: SEARCH_REPORTS,
            payload: search.toUpperCase()
        });
    };

    const getReport = async (id) => {
        try {
            const res = await axiosClient.get(`/api/showreport/${id}`);
            dispatch({
                type: GET_REPORT,
                payload: res.data.report
            });
        } catch (error) {
            dispatch({
                type: SHOW_ERROR_REPORT,
                payload: { msg: "No existe el reporte", category: "alerta-error" }
            });
        }
    };

    const getAllReports = async () => {
        try {
            const res = await axiosClient.get('/api/reports/all');
            dispatch({
                type: GET_ALL_REPORTS,
                payload: res.data.reports
            });
        } catch (error) {
            dispatch({
                type: SHOW_ERROR_REPORT,
                payload: { msg: "Hubo un error buscando los reportes", category: "alerta-error" }
            });
        }
    };

    const resetMessage = () => dispatch({ type: RESET_REPORT_MESSAGE });

    const createReport = async report => {
        try {
            const res = await axiosClient.post('/api/reports', report);
            dispatch({
                type: CREATE_REPORT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: SHOW_ERROR_REPORT,
                payload: { msg: error.response.data.msg, category: "alerta-error" }
            });
        }
    };

    const showError = () => {
        dispatch({ type: SHOW_ERROR_REPORT });
    };

    const selectReport = (id) => {
        dispatch({
            type: SELECT_REPORT,
            payload: id
        });
    };

    const deselectReport = () => {
        dispatch({
            type: DESELECT_REPORT
        });
    };

    const deleteReport = async (id) => {
        try {
            await axiosClient.delete(`/api/reports/${id}`);
            dispatch({
                type: DELETE_REPORT,
                payload: id
            });
        } catch (error) {
            dispatch({
                type: SHOW_ERROR_REPORT,
                payload: { msg: "Hubo un error eliminando el reporte", category: "alerta-error" }
            });
        }
    };

    const validateReportName = async (id) => {
        try {
            await axiosClient.get(`/api/showreport/${id}`);
            const alert = {
                msg: "El reporte para ese nombre ya existe",
                category: "alerta-error"
            };
            dispatch({
                type: INVALIDATE_REPORT,
                payload: alert
            });
        } catch (error) {
            dispatch({ type: VALIDATE_REPORT });
        }
    };

    const updateReport = async (report) => {
        try {
            const id = report._id;
            const res = await axiosClient.put(`/api/reports/${id}`, report);
            dispatch({
                type: UPDATE_REPORT,
                payload: res.data.report_modified
            });
        } catch (error) {
            console.log(error);
        }
    };

    const selectOnlyReport = (report) => {
        dispatch({
            type: SELECT_ONLY_REPORT,
            payload: report
        });
    };

    return (
        <reportContext.Provider
            value={{
                reports: state.reports,
                form: state.form,
                error: state.error,
                report: state.report,
                message: state.message,
                searchreports: state.searchreports,
                reportname_ok: state.reportname_ok,
                urlDoc: state.urlDoc,
                showForm,
                getReports,
                getReport,
                getAllReports,
                createReport,
                updateReport,
                deleteReport,
                selectReport,
                deselectReport,
                searchReports,
                validateReportName,
                resetMessage,
                selectOnlyReport,
                showError
            }}
        >
            {props.children}
        </reportContext.Provider>
    );
};

export default ReportState;
