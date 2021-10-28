import React, {useReducer} from 'react';
import importContext from './importContext'
import importReducer from './importReducer'
import {
    SHOW_ERROR,
    PROCESS_IMPORT_FILE,
    RESET_MESSAGE
    } from '../../types/index'

import axiosClient from '../../config/axios'


const ImportState = props=>{
    
    
    const initialState={
        form:false,
        message:null,
        error: false
    }

    //Dispatch para ejecutar las acciones
    const [state,dispatch] = useReducer(importReducer, initialState)


    const resetMessage = ()=>{
        dispatch({
            type:RESET_MESSAGE
        })
    }

    const processImportFile = async (file) =>{
        try {
            const formData = new FormData();
            formData.append("fileToProcess", file);
            const res = await axiosClient.post('/api/files', formData
                , {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }
            )
            console.log(res)
            dispatch({
                type:PROCESS_IMPORT_FILE,
                payload: res.data
             })
            const alert = {
                msg:"Se procesó el archivo correctamente",
                category:"alerta-ok"
            }
            console.log(alert)
            dispatch({
                type:SHOW_ERROR,
                payload: alert
            })
        } catch (error) {
            console.log(error.response.data.msg)
            const alert = {
                msg:error.response.data.msg,
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR,
                payload: alert
            })
        }      
    }

    return (
        <importContext.Provider
            value={{
                form: state.form,
                error: state.error,
                message: state.message,
                processImportFile,
                resetMessage
                
            }}
        >

            {props.children}
        </importContext.Provider>
    )

}

export default ImportState;