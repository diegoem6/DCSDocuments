import React, {useReducer} from 'react';
import networkContext from './networkContext'
import networkReducer from './networkReducer'
import {
    CREATE_NETWORK_NODE,
    SHOW_FORM_NETWORK, 
    GET_NETWORK_NODES,
    SHOW_ERROR
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

    return (
        <networkContext.Provider
            value={{
                form: state.form,
                networkNodes: state.networkNodes,
                showForm, 
                createNetworkNode,
                getNetworkNodes
            }}
        >

            {props.children}
        </networkContext.Provider>
    )

}

export default NetworkState;