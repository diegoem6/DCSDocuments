import React, {useReducer} from 'react';
import systemContext from './systemContext'
import systemReducer from './systemReducer'

import {
    ADD_SYSTEM, 
    GET_SYSTEMS,
    UPDATE_SYSTEM,
    SELECT_SYSTEM,
    DELETE_SYSTEM,
    DESELECT_SYSTEM,
    SHOW_ERROR,
    RESET_MESSAGE
} from '../../types/index'
import axiosClient from '../../config/axios';

const SystemState = (props) => {

    const initialState = {
        systems:[],
        systemSelected:null,
        message:null,
        active:false
    }

    const [state, dispatch] = useReducer(systemReducer,initialState)

    const addSystem = async (system)=>{
        try {
            const res = await axiosClient.post('/api/systems', system)
            dispatch({
                type:ADD_SYSTEM,
                payload: res.data
            })
            getSystems(system.asset)
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
    const getSystems = async (asset) =>{
        try {
            const res = await axiosClient.get('/api/systems', {params:{asset}})
            dispatch({
                type:GET_SYSTEMS,
                payload: res.data.systems
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

    const updateSystem = async (system) =>{
        try {
            const id = system._id
            const res = await axiosClient.put(`/api/systems/${id}`,system)
            
            dispatch({
                type:UPDATE_SYSTEM
            })

            getSystems(system.asset)

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

    const deleteSystem = async (system) =>{
        try {
            const id = system._id
            const idAsset = system.asset
            const res = await axiosClient.delete(`/api/systems/${id}`, {params:{idAsset}})
            
            dispatch({
                type:DELETE_SYSTEM,
                payload:system
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
    const resetMessage = () =>{
        dispatch({
            type:RESET_MESSAGE
        })
    }
    const selectSystem = (system) =>{
        dispatch({
            type:SELECT_SYSTEM,
            payload: system
        })
    }

    const deselectSystem = () =>{
        dispatch({
            type:DESELECT_SYSTEM
        })
    }

    return ( 
        <systemContext.Provider
            value ={{
                systems:state.systems,
                systemSelected: state.systemSelected,
                active:state.active,
                message:state.message,
                getSystems,
                updateSystem,
                addSystem,
                selectSystem,
                deleteSystem,
                deselectSystem,
                resetMessage
            }}
        >
            {props.children}
        </systemContext.Provider>
     );
}
 
export default SystemState;