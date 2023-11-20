import React, {useReducer} from 'react';
import iocardsContext from './iocardsContext'
import iocardsReducer from './iocardsReducer'
import {
    CREATE_IOCARD, 
    SHOW_FORM_IOCARD, 
    GET_IOCARDS,
    SHOW_ERROR,
    UPDATE_IOCARD,
    DELETE_IOCARD,
    SELECT_IOCARD,
    GET_IOCARD,
    GET_IOCARD_TYPES,
    GET_IOCARD_TYPE,
    RESET_MESSAGE,
    GET_IOCARD_STATUS,
    SEARCH_IOCARD,
    GET_IOCARD_NODE_ID,
    GET_IOCARD_CONTROLLERS,
    GET_IOCARD_CABINETS,
    DESELECT_IOCARD_NODE_ID,
    GET_IOCARD_CONTROLLERS_SINB,
    GET_IOCARDS_CONTROLLER_A,
    GET_IOCARDS_CONTROLLER_B
    } from '../../types/index'

import axiosClient from '../../config/axios'


const IOCardsState = props=>{
    
    const initialState={
        form:false,
        devices:[],
        devicesSearch:[],
        deviceSelected:null,
        message:null,
        devicetypes:[],
        devicetype:null,
        error: false,
        status:{},
        iocards:[],
        iocardsSearch:[],
        iocardsSelected:null,
        iocardtypes:[],
        iocardcontrollers:[],
        iocardcabinets:[]
    }

    //Dispatch para ejecutar las acciones
    const [state,dispatch] = useReducer(iocardsReducer, initialState)


    //defino las funciones para el CRUD de node devices
    const showForm =()=>{
        dispatch({
            type: SHOW_FORM_IOCARD
        })
    }

    const createIOCard = async (iocard)=>{
        //console.log("En el POST")
        try {
            
            const res = await axiosClient.post('/api/iocards', iocard)
            dispatch({
                type:CREATE_IOCARD,
                payload: res.data
            })
            //getDevices(device.asset) 
        } catch (error) {
            console.log(error.response)
            let aux=""
            if (error.response.status===400)
                aux=error.response.data.errors[0].msg //el mensaje de error viene del check del express-validator
            else
                aux=error.response.data.msg //el mensaje de error viene del iocardController
            
            const alert = {
                msg:aux,
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR,
                payload: alert
            })

        }
    }

    const getDevice = async (idDevice) =>{
        try {
            const res = await axiosClient.get(`/api/devices/${idDevice}`);
            dispatch({
                type:GET_IOCARD,
                payload:res.data.device_get //device_get esta definida en la respuesta del server
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
    
    const getIOCards = async (asset) =>{
        try {
            const res = await axiosClient.get('/api/iocards', {params:{asset}})
            dispatch({
                type:GET_IOCARDS,
                payload: res.data.iocards //iocards esta definida en la respuesta del server
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

    const getIOCardsAll = async (asset) =>{ //NO SE USA PORQUE NO DISTINGUE POR ASSET
        try {
            const res = await axiosClient.get('/api/iocards/all')
            dispatch({
                type:GET_IOCARDS,
                payload: res.data.iocards //iocards esta definida en la respuesta del server
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

    const getCabinets = async() =>{ //ver aca agregar la funcion que levanta los gabinetes pero la funcion debería pegarle a gabinetes
        try{
            const res = await axiosClient.get('/api/devicestypes')
            dispatch({
                type: GET_IOCARD_TYPES,
                payload: res.data.deviceTypes /*mismo nombre que devuelve el controller en el server*/
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


    const getIOCardControllers = async () =>{ //levanta todos los C300
        try{
            const res = await axiosClient.get('/api/iocards/iocardcontrollers')
            dispatch({
                type: GET_IOCARD_CONTROLLERS,
                payload: res.data.allControllers /*mismo nombre que devuelve el controller en el server*/
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


    const getIOCardControllers_sinB = async () =>{ //levanta todos los C300 menos los B
        try{
            const res = await axiosClient.get('/api/iocards/iocardcontrollerssinB')
            dispatch({
                type: GET_IOCARD_CONTROLLERS_SINB,
                payload: res.data.allControllers /*mismo nombre que devuelve el controller en el server*/
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


    const getIOCardCabinets = async () =>{ //levanta todos los C300
        try{
            const res = await axiosClient.get('/api/iocards/iocardcabinets')
            dispatch({
                type: GET_IOCARD_CABINETS,
                payload: res.data.cabinets /*mismo nombre que devuelve el controller en el server*/
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

    const getIOCardTypes = async () =>{  //levanta todos los tipos de IOCards
        try{
            const res = await axiosClient.get('/api/iocards/iocardstypes')
            dispatch({
                type: GET_IOCARD_TYPES,
                payload: res.data.iocardTypes_all /*mismo nombre que devuelve el controller en el server*/
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

    const getDeviceType = async(idDevice) =>{
        try {
            const res = await axiosClient.get(`/api/devicestypes/${idDevice}`);
            //console.log('En El devices state:', res)
            dispatch({
                type:GET_IOCARD_TYPE,
                payload:res.data.device_type /*mismo nombre que devuelve el controller en el server*/
            })
        } catch (error) {
            // const alert = {
            //     msg:"No existe el modelo del nodo de red",
            //     category:"alerta-error"
            // }
        }
    }

    const selectIOCard = (idIOCard) =>{
        dispatch({
            type: SELECT_IOCARD,
            payload:idIOCard
        })
    }

    const deleteIOCard = async (id) =>{
        try {
            await axiosClient.delete(`/api/iocards/${id}`);
            dispatch({
                type:DELETE_IOCARD,
                payload:id
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

    const getDeviceStatus = async (idDevice) =>{
        try {
            const res = await axiosClient.get(`/api/devices/status/${idDevice}`)
            
            dispatch({
                type:GET_IOCARD_STATUS,
                payload:res.data
            })
            

        } catch (error) {
            console.log(error)

        }
    }


    const updateIOCard = async (iocard) =>{
        
        try {
            const id = iocard._id
            const res = await axiosClient.put(`/api/iocards/${id}`,iocard)
            
            dispatch({
                type:UPDATE_IOCARD,
                payload:res.data.iocardUpdate
            })
            

        } catch (error) {
            //console.log(error.response.data.errors[0].msg)
            //console.log(error.response)
            //console.log(error.response.status)
            let aux=""
            if (error.response.status===400)
                aux=error.response.data.errors[0].msg //el mensaje de error viene del check del express-validator
            else
                aux=error.response.data.msg //el mensaje de error viene del iocardController
            const alert = {
                msg:aux,
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR,
                payload: alert
            })

        }
    }

    const searchIOCards = (text) => {
        dispatch({
            type:SEARCH_IOCARD,
            payload:text
        })
    }

    const getDeviceID = async (deviceName) =>{
        try {
            const res = await axiosClient.get('/api/architecture/getDeviceID', {params:{deviceName}});
            //const res = await axiosClient.request({method: 'GET', url: '/api/architecture/getNetworkNodeID',  data:{ networknode: 'PMSWSE221A' }})
            dispatch({
                type:GET_IOCARD_NODE_ID,
                payload:res.data.idDevice //idnetworknode esta definida en la respuesta del server
            })
        } catch (error) {
            const alert = {
                msg:"hubo un error con el device",
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR,
                payload: alert
            })
        }      
    }

    const deselectDeviceId = () => {
        dispatch({
            type:DESELECT_IOCARD_NODE_ID
        })
    }

    const getIoCardsContrllerA = async (idController)=>{
        try {
            const res = await axiosClient.get(`/api/iocards/iocardsA/${idController}`)
            dispatch({
                type:GET_IOCARDS_CONTROLLER_A,
                payload: res.data.iocards //iocards esta definida en la respuesta del server
            })
        } catch (error) {
            const alert = {
                msg:"hubo un error con el device",
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR,
                payload: alert
            })
        }


    }
    const getIoCardsContrllerB =(idController)=>{


    }
    return (
        <iocardsContext.Provider
            value={{
                form: state.form,
                devices: state.devices,
                deviceSelected: state.deviceSelected,
                error: state.error,
                devicetypes: state.devicetypes,
                devicetype: state.devicetype,
                status: state.status,
                devicesSearch: state.devicesSearch,
                deviceID: state.deviceID,
                message: state.message,
                iocards: state.iocards,
                iocardsSearch: state.iocardsSearch,
                iocardsSelected:state.iocardsSelected,
                iocardtypes: state.iocardtypes, //tiene todos los tipos de iocards
                iocardcontrollers: state.iocardcontrollers, //tiene todos los controladores
                iocardcabinets: state.iocardcabinets, //tiene todos los controladores
                showForm, 
                //createDevice,
                createIOCard,
                //getDevices,
                getIOCards,
                getIOCardsAll,
                getIOCardTypes,
                getDevice,
                updateIOCard,
                //updateDevice,
                showError,
                selectIOCard,
                deleteIOCard,
                //getDeviceTypes,
                getDeviceType,
                resetMessage,
                getDeviceStatus,
                searchIOCards, //haciendo
                getDeviceID,
                deselectDeviceId,
                getIOCardControllers,
                getIOCardControllers_sinB,
                getIOCardCabinets,
                getCabinets,
                getIoCardsContrllerA,
                getIoCardsContrllerB
                
            }}
        >
            {props.children}
        </iocardsContext.Provider>
    )
}

export default IOCardsState;