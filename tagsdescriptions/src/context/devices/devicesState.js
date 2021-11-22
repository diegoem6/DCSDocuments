import React, {useReducer} from 'react';
import devicesContext from './devicesContext'
import devicesReducer from './devicesReducer'
import {
    CREATE_DEVICE,
    SHOW_FORM_DEVICE, 
    GET_DEVICES,
    SHOW_ERROR,
    UPDATE_DEVICE,
    DELETE_DEVICE,
    SELECT_DEVICE,
    GET_DEVICE,
    GET_DEVICE_TYPES,
    GET_DEVICE_TYPE,
    RESET_MESSAGE,
    GET_DEVICE_STATUS
    } from '../../types/index'

import axiosClient from '../../config/axios'


const DevicesState = props=>{
    
    
    const initialState={
        form:false,
        devices:[],
        deviceSelected:null,
        message:null,
        devicetypes:[],
        devicetype:null,
        error: false,
        status:{}
    }

    //Dispatch para ejecutar las acciones
    const [state,dispatch] = useReducer(devicesReducer, initialState)


    //defino las funciones para el CRUD de node devices
    const showForm =()=>{
        dispatch({
            type: SHOW_FORM_DEVICE
        })
    }

    const createDevice = async (device)=>{
        try {
            
            const res = await axiosClient.post('/api/devices', device)
            dispatch({
                type:CREATE_DEVICE,
                payload: res.data
            })
            getDevices(device.asset) 
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

    const getDevice = async (idDevice) =>{
        try {
            const res = await axiosClient.get(`/api/devices/${idDevice}`);
            dispatch({
                type:GET_DEVICE,
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

    const getDevices = async (asset) =>{
        try {
            const res = await axiosClient.get('/api/devices', {params:{asset}})
            dispatch({
                type:GET_DEVICES,
                payload: res.data.devices //devices esta definida en la respuesta del server
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

    
    const getDeviceTypes = async () =>{
        try{
            const res = await axiosClient.get('/api/devicestypes')
            dispatch({
                type: GET_DEVICE_TYPES,
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

    const getDeviceType = async(idDevice) =>{
        try {
            const res = await axiosClient.get(`/api/devicestypes/${idDevice}`);
            //console.log('En El devices state:', res)
            dispatch({
                type:GET_DEVICE_TYPE,
                payload:res.data.device_type /*mismo nombre que devuelve el controller en el server*/
            })
        } catch (error) {
            const alert = {
                msg:"No existe el modelo del nodo de red",
                category:"alerta-error"
            }
        }
    }

    const selectDevice = (idDevice) =>{
        dispatch({
            type: SELECT_DEVICE,
            payload:idDevice
        })
    }

    const deleteDevice = async (idDevice) =>{
        try {
            await axiosClient.delete(`/api/devices/${idDevice}`);
            dispatch({
                type:DELETE_DEVICE,
                payload:idDevice
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
                type:GET_DEVICE_STATUS,
                payload:res.data
            })
            

        } catch (error) {
            console.log(error)

        }
    }


    const updateDevice = async (device) =>{
        
        try {
            const id = device._id
            const res = await axiosClient.put(`/api/devices/${id}`,device)
            
            dispatch({
                type:UPDATE_DEVICE,
                payload:res.data.deviceUpdate
            })
            

        } catch (error) {
            console.log(error)

        }
    }

    return (
        <devicesContext.Provider
            value={{
                form: state.form,
                devices: state.devices,
                deviceSelected: state.deviceSelected,
                error: state.error,
                devicetypes: state.devicetypes,
                devicetype: state.devicetype,
                status: state.status,

                showForm, 
                createDevice,
                getDevices,
                getDevice,
                updateDevice,
                showError,
                selectDevice,
                deleteDevice,
                getDeviceTypes,
                getDeviceType,
                resetMessage,
                getDeviceStatus
                
            }}
        >

            {props.children}
        </devicesContext.Provider>
    )

}

export default DevicesState;