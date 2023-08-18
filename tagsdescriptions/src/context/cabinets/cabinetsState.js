import React, { useReducer } from 'react';
import imageCompression from 'browser-image-compression';
import cabinetsReducer from './cabinetsReducer';
import CabinetsContext from './cabinetsContext';


import {
    SHOW_FORM_CABINET,
    CREATE_CABINET,
    GET_CABINETS,
    GET_CABINET,
    GET_CABINETBYNAME,
    DELETE_CABINET,
    //SELECT_CABINET,
    UPDATE_CABINETS,
    GET_AREAS,
    SHOW_ERROR_CABINET,
    // UPLOAD_FILE_CABINETS,
    UPLOAD_FILE_CABINETS_SUCCESS,
    DELETE_FILE_CABINETS,
    // DELETE_FILE_CABINETS_SUCCESS,
    RESET_MESSAGE_CABINET,
    DESELECT_CABINET

} from '../../types/index'

import axiosClient from '../../config/axios'

const CabinetState = ({ children }) => {

    const initialState = {
        cabinets: [],
        cabinetSelected: null,
        //files: [],
        //filesSelected: [],
        form: false,
        message: null,
        areas: [],
        error: false
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(cabinetsReducer, initialState)

    //Defino las funciones para el CRUD
    const showForm = () => {
        dispatch({
            type: SHOW_FORM_CABINET
        })
    }

    const createCabinet = async cabinet => {
        try {
            const result = await axiosClient.post('/api/cabinets', cabinet)
            dispatch({
                type: CREATE_CABINET,
                payload: result.data
            })
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: SHOW_ERROR_CABINET,
                payload: alert
            })
        }
    }
    const getAreas = async () => {
        try {
            const result = await axiosClient.get('/api/areas')

            dispatch({
                type: GET_AREAS,
                payload: result.data.areas

            })
        } catch (error) {
            console.log(error)
        }
    }
    const getCabinets = async (assetId) => {

        try {
            const result = await axiosClient.get('/api/cabinets', { params: { assetId } })
            dispatch({
                type: GET_CABINETS,
                payload: result.data.cabinets
            })
        } catch (error) {
            console.log(error)
        }
    }
    const getCabinet = async id => {
        try {
            const result = await axiosClient.get(`api/cabinets/${id}`)
            dispatch({
                type: GET_CABINET,
                payload: result.data.cabinet
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getCabinetbyName = async cabinetname => {
        try {
            const result = await axiosClient.get(`api/cabinets/cabinetname/${cabinetname}`)
            // console.log(result.data.cabinet)
            dispatch({
                type: GET_CABINETBYNAME,
                payload: result.data.cabinet
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCabinet = async (id) => {
        try {
            await axiosClient.delete(`/api/cabinets/${id}`)
            dispatch({
                type: DELETE_CABINET,
                payload: id
            })
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: SHOW_ERROR_CABINET,
                payload: alert
            })
        }

    }
    const selectCabinet = (cabinetID) => {
        getCabinet(cabinetID)
    }

    const selectCabinetbyName = (cabinetName) => {
        getCabinetbyName(cabinetName)
    }

    const uploadFileCabinet = async (cabinet, files) => {
        
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1000,
                useWebWorker: true
            }

            for (let i = 0; i < files.length; i++) {
                const compressedFile = await imageCompression(files[i], options)
                const formData = new FormData()
                formData.append('cabinetsFiles', compressedFile)
                const result = await axiosClient.post(`api/cabinetfiles/${cabinet._id}`, formData)
                uploadFileCabinetSuccess(result.data.cabinet)
            }

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: SHOW_ERROR_CABINET,
                payload: alert
            })
        }
    }
    const uploadFileCabinetSuccess = (cabinet) => {
        dispatch({
            type: UPLOAD_FILE_CABINETS_SUCCESS,
            payload: cabinet
        })
    }

    const updateCabinet = async (cabinet) => {
        try {
            const id = cabinet._id
            const res = await axiosClient.put(`/api/cabinets/${id}`, cabinet)
            dispatch({
                type: UPDATE_CABINETS,
                payload: res.data.cabinetUpdate
            })
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: SHOW_ERROR_CABINET,
                payload: alert
            })
        }
    }

    const resetMessage = () => {
        dispatch({
            type: RESET_MESSAGE_CABINET
        })
    }


    const deSelectCabinet = async () => {
        dispatch({
            type: DESELECT_CABINET,
            payload: null
        })
    }

    const deleteFileCabinet = async (idCabinet, fileNameDeleted) => {

        try {

            const res = await axiosClient.delete(`api/cabinetfiles/${idCabinet}`, { params: { fileNameDeleted } });
            dispatch({
                type: DELETE_FILE_CABINETS,
                payload: res.data.cabinetUpdate
            })

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: SHOW_ERROR_CABINET,
                payload: alert
            })
        }
    }

    return (

        <CabinetsContext.Provider value={{
            cabinets: state.cabinets,
            cabinetSelected: state.cabinetSelected,
            form: state.form,
            message: state.message,
            areas: state.areas,
            error: state.error,
            createCabinet,
            getCabinet,
            getCabinetbyName,
            getCabinets,
            deleteCabinet,
            showForm,
            getAreas,
            resetMessage,
            uploadFileCabinet,
            updateCabinet,
            selectCabinet,
            selectCabinetbyName,
            deSelectCabinet,
            deleteFileCabinet
        }}>
            {children}
        </CabinetsContext.Provider>
    )
}

export default CabinetState;