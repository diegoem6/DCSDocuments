import React, {useReducer} from 'react';
import networkContext from './networkContext'
import networkReducer from './networkReducer'
import {
    CREATE_NETWORK_NODE,
    SHOW_FORM_NETWORK, 
    GET_NETWORK_NODES,
    GET_AREAS,
    SHOW_ERROR,
    UPDATE_NETWORK_NODE,
    DELETE_NETWORK_NODE,
    SELECT_NETWORK_NODE,
    GET_NETWORK_NODE,
    GET_NETWORK_MODELS,
    GET_NETWORK_MODEL,
    RESET_MESSAGE,
    CREATE_NETWORK_SHOW_RUN,
    GET_ARCHITECTURE_NODES,
    GET_ARCHITECTURE_DEVICES,
    GET_NETWORK_NODE_ID,
    DESELECT_NETWORK_NODE_ID
    } from '../../types/index'

import axiosClient from '../../config/axios'


const NetworkState = props=>{
    
    
    const initialState={
        form:false,
        networkNodes:[],
        networkNodeSelected:null,
        message:null,
        networkNodeID:null,
        networkmodels:[],
        areas:[],
        networkmodel:null,
        urlDoc:null,
        architectureDevices:{},
        architectureNetworkNodes:[]
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

    const resetMessage = ()=>{
        dispatch({
            type:RESET_MESSAGE
        })
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

    const getNetworkNodesAll = async (asset) =>{
        try {
            const res = await axiosClient.get('/api/network/all')
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

    const getNetworkModels = async () =>{
        try{
            const res = await axiosClient.get('/api/networkmodels')
            dispatch({
                type: GET_NETWORK_MODELS,
                payload: res.data.networkNodeModels /*mismo nombre que devuelve el controller en el server*/ 
            })
        }
        catch(error){
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

    const getAreas = async () =>{
        try{
            const res = await axiosClient.get('/api/areas')
            dispatch({
                type: GET_AREAS,
                payload: res.data.areas /*mismo nombre que devuelve el controller en el server*/ 
            })
        }
        catch(error){
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

    const getNetworkModel = async(idNetworkModel) =>{
        try {
            const res = await axiosClient.get(`/api/networkmodels/${idNetworkModel}`);
            //console.log('En El network state:', res)
            dispatch({
                type:GET_NETWORK_MODEL,
                payload:res.data.networkModel_get /*mismo nombre que devuelve el controller en el server*/
            })
        } catch (error) {
            // const alert = {
            //     msg:"No existe el modelo del nodo de red",
            //     category:"alerta-error"
            // }
        }
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
                msg:"hubo un error eliminando el nodo de red",
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR,
                payload: alert
            })
        }      
    }

    const updateNetworkNode = async (network_node) =>{
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

    const createNetworkNodeShowRun = async (ip, tipo) =>{
        const data = {
            ip: ip,
            tipo: tipo
        }
        
        try {
            //const res = await axiosClient.get('/api/networkShow', {params:{ip}});
            //funciona:
            const res = await axiosClient.get('/api/networkShow',{params:{data}});
            //const res = await axiosClient.get(`/api/networkShow/${data}`);
            dispatch({
                type: CREATE_NETWORK_SHOW_RUN,
                payload: res.data.filename
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const getArchitectureDevices = async(networkNode) =>{
        try {
            //console.log(networknode)
            const res = await axiosClient.get('/api/architecture/getArchitectureDevices', {params:{networkNode}}) //networkNode se tiene que llamar igual de ambos lados
            //const res = await axiosClient.get('api/architecture/getArchitectureDevices?networkNode=PMSWSY011A')
            dispatch({
                type:GET_ARCHITECTURE_DEVICES,
                payload:res.data.accessArchitecture //aca accedo a nodes y connections
            })
            

        } catch (error) {
            console.log(error)

        }
    }

    const getArchitectureNetworkNodes = async() =>{
        
        try {
            const res = await axiosClient.get('/api/architecture/getArchitectureNodes')
            dispatch({
                type:GET_ARCHITECTURE_NODES,
                payload:res.data.coreArchitecture //aca accedo a nodes y connections
            })
            

        } catch (error) {
            console.log(error)

        }
    }

    const getNetworkNodeID = async (networknode) =>{
        try {
            
            const res = await axiosClient.get('/api/architecture/getNetworkNodeID', {params:{networknode}});
            //const res = await axiosClient.request({method: 'GET', url: '/api/architecture/getNetworkNodeID',  data:{ networknode: 'PMSWSE221A' }})
            dispatch({
                type:GET_NETWORK_NODE_ID,
                payload:res.data.idnetworknode //idnetworknode esta definida en la respuesta del server
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

    const deselectNetworkNodeId = () => {
        dispatch({
            type:DESELECT_NETWORK_NODE_ID
        })
    }


    return (
        <networkContext.Provider
            value={{
                form: state.form,
                networkNodes: state.networkNodes,
                networkNodeSelected: state.networkNodeSelected,
                error: state.error,
                networkmodels: state.networkmodels,
                networkmodel: state.networkmodel,
                urlDoc:state.urlDoc,
                areas:state.areas,
                architectureDevices: state.architectureDevices,
                architectureNetworkNodes: state.architectureNetworkNodes,
                networkNodeID: state.networkNodeID,
                showForm, 
                createNetworkNode,
                getNetworkNodes,
                getNetworkNode,
                getNetworkNodesAll,
                updateNetworkNode,
                showError,
                selectNetworkNode,
                deleteNetworkNode,
                getNetworkModels,
                getNetworkModel,
                resetMessage,
                createNetworkNodeShowRun,
                getAreas,
                getArchitectureDevices,
                getArchitectureNetworkNodes,
                getNetworkNodeID,
                deselectNetworkNodeId
            }}
        >

            {props.children}
        </networkContext.Provider>
    )

}

export default NetworkState;