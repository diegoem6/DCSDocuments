import React, {useReducer} from 'react';
import tagDescriptorContext from './tagDescriptorContext'
import tagDescriptorReducer from './tagDescriptorReducer'
import {
    FORM_TAGDESCRIPTOR, 
    GET_TAGDESCRIPTOR,
    CREATE_TAGDESCRIPTOR,
    SHOW_ERROR_TAGDESCRIPTOR,
    SELECT_TAGDESCRIPTOR,
    GET_TAGSDESCRIPTORS,
    DELETE_TAGDESCRIPTOR} from '../../types/index'

import axiosClient from '../../config/axios'


const TagDescriptorState = props=>{
    
    
    const initialState={
        tagdescriptors : [],
        form:false,
        error: false, 
        tagdescriptor: null,
        message:null
    }

    //Dispatch para ejecutar las acciones
    const [state,dispatch] = useReducer(tagDescriptorReducer, initialState)


    //defino las funciones para el CRUD de tagdescriptor
    const showForm =()=>{
        dispatch({
            type: FORM_TAGDESCRIPTOR
        })
    }

    const getTagsDescriptors = async (system)=>{
        try {
            
            const res = await axiosClient.get('/api/tagsdescriptors', {params:{system}});
            console.log(res)
            dispatch({
                type: GET_TAGSDESCRIPTORS,
                payload: res.data.tagsdescriptors
            })
        } catch (error) {
            const alert = {
                msg:"hubo un error buscando los tagdescriptors",
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR_TAGDESCRIPTOR,
                payload: alert
            })
        }
        
    }

    const getTagDescriptor = async (id)=>{
        try {
            
            const res = await axiosClient.get(`/api/showtag/${id}`);
            console.log(res)
            dispatch({
                type: GET_TAGDESCRIPTOR,
                payload: res.data.tagdescriptor
            })
        } catch (error) {
            const alert = {
                msg:"hubo un error buscando los tagdescriptors",
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR_TAGDESCRIPTOR,
                payload: alert
            })
        }
        
    }

    const createTagDescriptor = async ptagdescriptor =>{

        try {
            const res = await axiosClient.post('/api/tagsdescriptors',ptagdescriptor);
            console.log(res.data)
            dispatch({
                type: CREATE_TAGDESCRIPTOR,
                payload: res.data
            })
        } catch (error) {
            const alert = {
                msg:"hubo un error creando el tag descriptor",
                categoria:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR_TAGDESCRIPTOR,
                payload: alert
            })
        }
        
        
    }

    const showError = () =>{
        dispatch({
            type: SHOW_ERROR_TAGDESCRIPTOR
        })
    }

    const selectTagDescriptor = (idTagDescriptor) =>{
        dispatch({
            type: SELECT_TAGDESCRIPTOR,
            payload:idTagDescriptor
        })
    }

    const deleteTagDescriptor = async (idTagDescriptor) =>{
        try {
            await axiosClient.delete(`/api/proyectos/${idTagDescriptor}`);
            dispatch({
                type:DELETE_TAGDESCRIPTOR,
                payload:idTagDescriptor
            })
        } catch (error) {
            const alert = {
                msg:"hubo un error eliminando el tag descriptor",
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR_TAGDESCRIPTOR,
                payload: alert
            })
        }
        
       
    }

    return (
        <tagDescriptorContext.Provider
            value={{
                tagdescriptors: state.tagdescriptors,
                form: state.form,
                error: state.error,
                tagdescriptor: state.tagdescriptor,
                message: state.message,
                showForm, 
                getTagsDescriptors,
                createTagDescriptor,
                showError, 
                selectTagDescriptor,
                deleteTagDescriptor,
                getTagDescriptor
            }}
        >

            {props.children}
        </tagDescriptorContext.Provider>
    )

}

export default TagDescriptorState;