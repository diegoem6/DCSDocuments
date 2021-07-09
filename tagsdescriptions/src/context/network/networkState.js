import React, {useReducer} from 'react';
import networkContext from './networkContext'
import networkReducer from './networkReducer'
import {
    CREATE_NETWORK_NODE,
    SHOW_FORM_NETWORK, 
    GET_NETWORK_NODES,
    SHOW_ERROR,
    UPDATE_NETWORK_NODE,
    DELETE_NETWORK_NODE,
    SELECT_NETWORK_NODE,
    GET_NETWORK_NODE
    } from '../../types/index'

import axiosClient from '../../config/axios'


const NetworkState = props=>{
    
    
    const initialState={
        form:false,
        networkNodes:[],
        networkNodeSelected:null,
        message:null
    }

    //Dispatch para ejecutar las acciones
    const [state,dispatch] = useReducer(networkReducer, initialState)


    //defino las funciones para el CRUD de node network
    const showForm =()=>{
        dispatch({
            type: SHOW_FORM_NETWORK
        })
    }

    const createNetworkNode = async (network_node)=>{
        try {
            console.log(network_node)
            const res = await axiosClient.post('/api/network', network_node)
            dispatch({
                type:CREATE_NETWORK_NODE,
                payload: res.data
            })
            getNetworkNodes(network_node.asset)
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type:SHOW_ERROR,
                payload:alert
            })
        }
    }

    const getNetworkNode = async (idNetworkNode) =>{
        try {
            const res = await axiosClient.get(`/api/network/${idNetworkNode}`);
            dispatch({
                type:GET_NETWORK_NODE,
                payload:res.data.network_get //network_get esta definida en la respuesta del server
            })
        } catch (error) {
            const alert = {
                msg:"hubo un error con el nooe de red",
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR,
                payload: alert
            })
        }      
    }

    const getNetworkNodes = async (asset) =>{
        try {
            const res = await axiosClient.get('/api/network', {params:{asset}})
            dispatch({
                type:GET_NETWORK_NODES,
                payload: res.data.networkNodes
            })

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type:SHOW_ERROR,
                payload:alert
            })
        }
    }

    const showError = () =>{
        dispatch({
            type: SHOW_ERROR
        })
    }

    const selectNetworkNode = (idNetworkNode) =>{
        dispatch({
            type: SELECT_NETWORK_NODE,
            payload:idNetworkNode
        })
    }

    const deleteNetworkNode = async (idNetworkNode) =>{
        try {
            await axiosClient.delete(`/api/network/${idNetworkNode}`);
            dispatch({
                type:DELETE_NETWORK_NODE,
                payload:idNetworkNode
            })
        } catch (error) {
            const alert = {
                msg:"hubo un error eliminando el node de red",
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR,
                payload: alert
            })
        }      
    }

    const updateNetworkNode = async (network_node) =>{
        console.log("El nodo a modificar es: ",network_node)
        try {
            const id = network_node._id
            const res = await axiosClient.put(`/api/network/${id}`,network_node)
            
            dispatch({
                type:UPDATE_NETWORK_NODE,
                payload:res.data.network_node_modified
            })
            

        } catch (error) {
            console.log(error)

        }
    }

    return (
        <networkContext.Provider
            value={{
                form: state.form,
                networkNodes: state.networkNodes,
                networkNodeSelected: state.networkNodeSelected,
                error: state.error,
                showForm, 
                createNetworkNode,
                getNetworkNodes,
                getNetworkNode,
                updateNetworkNode,
                showError,
                selectNetworkNode,
                deleteNetworkNode
            }}
        >

            {props.children}
        </networkContext.Provider>
    )

}

export default NetworkState;