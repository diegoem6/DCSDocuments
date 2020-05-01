import React, {useReducer} from 'react';
import systemContext from './systemContext'
import systemReducer from './systemReducer'

import {
    ADD_SYSTEM, 
    GET_SYSTEMS,
    UPDATE_SYSTEM,
    SELECT_SYSTEM,
    DELETE_SYSTEM
} from '../../types/index'
import axiosClient from '../../config/axios';

const SystemState = (props) => {

    const initialState = {
        systems:[],
        systemSelected:null,
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
            console.log(error)

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
            console.log(error)

        }
    }

    const selectSystem = (system) =>{
        dispatch({
            type:SELECT_SYSTEM,
            payload: system
        })
    }

    return ( 
        <systemContext.Provider
            value ={{
                systems:state.systems,
                systemSelected: state.systemSelected,
                active:state.active,
                getSystems,
                updateSystem,
                addSystem,
                selectSystem,
                deleteSystem
            }}
        >
            {props.children}
        </systemContext.Provider>
     );
}
 
export default SystemState;