import React, {useReducer} from 'react';
import tagDescriptorContext from './tagDescriptorContext'
import tagDescriptorReducer from './tagDescriptorReducer'
import {
    FORM_TAGDESCRIPTOR, 
    GET_TAGDESCRIPTOR,
    CREATE_TAGDESCRIPTOR,
    SHOW_ERROR_TAGDESCRIPTOR,
    UPDATE_TAGDESCRIPTOR,
    SELECT_TAGDESCRIPTOR,
    DESELECT_TAGDESCRIPTOR,
    GET_TAGSDESCRIPTORS,
    DELETE_TAGDESCRIPTOR,
    SEARCH_TAGSDESCRIPTORS,
    RESET_MESSAGE,
    VALIDATE_TAGDESCRIPTOR,
    INVALIDATE_TAGDESCRIPTOR} from '../../types/index'

import axiosClient from '../../config/axios'


const TagDescriptorState = props=>{
    
    
    const initialState={
        tagdescriptors : [],
        searchtagdescriptors: [],
        form:false,
        tagname_ok: true, 
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

    const searchTagsDescriptors = async (search)=>{
        try {
            console.log(search)
            
            dispatch({
                type: SEARCH_TAGSDESCRIPTORS,
                payload: search
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
                msg:"No existe el tag descriptor",
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR_TAGDESCRIPTOR,
                payload: alert
            })
        }
        
    }

    const resetMessage = ()=>{
        dispatch({
            type:RESET_MESSAGE
        })
    }
    const createTagDescriptor = async ptagdescriptor =>{

        try {
            
            const res = await axiosClient.post('/api/tagsdescriptors',ptagdescriptor);
            dispatch({
                type: CREATE_TAGDESCRIPTOR,
                payload: res.data
            })
            
            
        } catch (error) {
            const alert = {
                msg:error.response.data.msg,
                category:"alerta-error"
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

    const selectTagDescriptor = (id_tagdescriptor) =>{
        dispatch({
            type: SELECT_TAGDESCRIPTOR,
            payload:id_tagdescriptor
        })
    }

    const deselectTagDescriptor = (id_tagdescriptor) =>{
        dispatch({
            type: DESELECT_TAGDESCRIPTOR
        })
    }

    const deleteTagDescriptor = async (idTagDescriptor) =>{
        try {
            await axiosClient.delete(`/api/tagsdescriptors/${idTagDescriptor}`);
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

    const validateTagname = async (id) =>{
        try {
            await axiosClient.get(`/api/showtag/${id}`);
            const alert = {
                msg:"El tag descriptor para ese tagname ya existe",
                category:"alerta-error"
            }
            dispatch({
                type: INVALIDATE_TAGDESCRIPTOR,
                payload: alert
            })
        } catch (error) {
            dispatch({
                type:VALIDATE_TAGDESCRIPTOR
            })
        }
    }

    const updateTagDescriptor = async (tagdescriptor) =>{
        try {
            const id = tagdescriptor._id
            const res = await axiosClient.put(`/api/tagsdescriptors/${id}`,tagdescriptor)
            
            dispatch({
                type:UPDATE_TAGDESCRIPTOR,
                payload:res.data.tag_descriptor_modified
            })
            

        } catch (error) {
            console.log(error)

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
                searchtagdescriptors: state.searchtagdescriptors,
                tagname_ok:state.tagname_ok,
                showForm, 
                getTagsDescriptors,
                createTagDescriptor,
                showError, 
                selectTagDescriptor,
                deleteTagDescriptor,
                getTagDescriptor,
                deselectTagDescriptor,
                updateTagDescriptor,
                searchTagsDescriptors,
                resetMessage,
                validateTagname
            }}
        >

            {props.children}
        </tagDescriptorContext.Provider>
    )

}

export default TagDescriptorState;