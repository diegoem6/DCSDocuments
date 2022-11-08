import React, {useReducer} from 'react';
import connectionContext from './connectionContext'
import connectionReducer from './connectionReducer'
import {
    CREATE_CONNECTION,
    GET_CONNECTIONS,
    DELETE_CONNECTION,
    SEARCH_CONNECTIONS,
    
    SHOW_ERROR,
    RESET_MESSAGE
    } from '../../types/index'

import axiosClient from '../../config/axios'


const ConnectionState = props=>{
    
    
    const initialState={
        connections:[],
        connectionsSearch:[],
        message:null,
        error: false,
    }

    //Dispatch para ejecutar las acciones
    const [state,dispatch] = useReducer(connectionReducer, initialState)



    const createConnection = async (connection)=>{
        try {
            
            const res = await axiosClient.post('/api/connections/', connection)
            console.log(res)
            dispatch({
                type:CREATE_CONNECTION,
                payload: res.data.connection
            })
        } catch (error) {
            console.log(error.response.data)
            const alert = {
                msg: error.response.data,
                category: 'alerta-error'
            }
            dispatch({
                type:SHOW_ERROR,
                payload:alert
            })
        }
    }

    const getConnections = async () =>{
        try {
            const res = await axiosClient.get(`/api/connections/`);
            
            dispatch({
                type:GET_CONNECTIONS,
                payload:res.data.connections
            })
        } catch (error) {
            const alert = {
                msg:"hubo un error en el listado de las conexiones",
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR,
                payload: alert
            })
        }      
    }

    const resetMessage = ()=>{
        dispatch({
            type:RESET_MESSAGE
        })
    }

    const showError = () =>{
        dispatch({
            type: SHOW_ERROR
        })
    }

    
    const deleteConnection = async (idConnection) =>{
        try {
            await axiosClient.delete(`/api/connections/${idConnection}`);
            dispatch({
                type:DELETE_CONNECTION,
                payload:idConnection
            })
        } catch (error) {
            const alert = {
                msg:"hubo un error eliminando el nodo de red",
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR,
                payload: alert
            })
        }      
    }

    const searchConnections = (text) => {
        dispatch({
            type:SEARCH_CONNECTIONS,
            payload:text
        })
    }


    return (
        <connectionContext.Provider
            value={{
                connections: state.connections,
                error: state.error,
                connectionsSearch: state.connectionsSearch,
                message: state.message,

                createConnection,
                getConnections,
                resetMessage,
                showError,
                deleteConnection,
                searchConnections
            }}
        >

            {props.children}
        </connectionContext.Provider>
    )

}

export default ConnectionState;