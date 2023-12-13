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
    GET_ALL_TAGDESCRIPTORS,
    DELETE_TAGDESCRIPTOR,
    SEARCH_TAGSDESCRIPTORS,
    RESET_MESSAGE,
    VALIDATE_TAGDESCRIPTOR,
    INVALIDATE_TAGDESCRIPTOR,
    CREATE_DOCUMENT,
    GET_TAGSDESCRIPTORS_RELATED,
    SELECT_ONLY_DESCRIPTOR,
    GET_INTERLOCKS,
    GET_AYE,
    GET_FOTOS} from '../../types/index'

import axiosClient from '../../config/axios'


const TagDescriptorState = props=>{
    
    
    const initialState={
        tagdescriptors : [],
        searchtagdescriptors: [],
        interlocks : [],
        alarmasyeventos : [],
        fotos : null,
        form:false,
        tagname_ok: true, 
        tagdescriptor: null,
        related:[],
        message:null,
        urlDoc:null
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
            dispatch({
                type: SEARCH_TAGSDESCRIPTORS,
                payload: search.toUpperCase()
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
           // console.log(res)
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
    const getAllTagDescriptor = async ()=>{
        try {
          //  console.log("SEBA")
            const res = await axiosClient.get('/api/tagsdescriptors/all');
            //console.log(res.data.tagsdescriptors)
            dispatch({
                type: GET_ALL_TAGDESCRIPTORS,
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

    const createDocument = async system =>{

        try {
            
            const res = await axiosClient.get('/api/documents',{params:{system}});
            dispatch({
                type: CREATE_DOCUMENT,
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
        console.log("Select",id_tagdescriptor)
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

    const  selectOnlyDescriptor = async (tagdescriptor) =>{
        dispatch({
                type: SELECT_ONLY_DESCRIPTOR,
                payload: tagdescriptor
            })
    }


    const  getTagDescriptorsRelated = async (id) =>{
        try {
            const res = await axiosClient.get(`/api/tagsdescriptors/related/${id}`);
            console.log(res.data)
            dispatch({
                type: GET_TAGSDESCRIPTORS_RELATED,
                payload: res.data.tagsDescriptors_related
            })
        } catch (error) {
            const alert = {
                msg:"No existen descriptores relacionados",
                category:"alerta-error"
            }
            dispatch({
                type:SHOW_ERROR_TAGDESCRIPTOR,
                payload: alert
            })
        }
        
    }

    const getInterlocks = async (tagdescriptor) =>{
        try {
            const id = tagdescriptor._id
            const res = await axiosClient.get(`/api/interlocks/${id}`)
            //console.log(res)
            dispatch({
                type:GET_INTERLOCKS,
                payload:res.data.resp
            })
            

        } catch (error) {
            console.log(error)

        }
    }
    
    const getAlarmayEventos = async (id) =>{
        try {
            //console.log('El id es ',id)
            const res = await axiosClient.get(`/api/alarmasyeventos/${id}`) //consulta al server
            //console.log(res)

            dispatch({
                type:GET_AYE,
                payload:res.data.resp //aca tengo el resultado de la consulta al server, y en el reducer es donde le digo que el payload lo guarde en alarmasyeventos
            })
            

        } catch (error) {
            console.log(error)

        }
    }

    const getFotos = async (tagdescriptor) =>{
        try {
            const id = tagdescriptor._id
            const res = await axiosClient.get(`/api/fotos/${id}`)
            //console.log(res)
            dispatch({
                type:GET_FOTOS,
                payload:res.data.resp
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
                urlDoc:state.urlDoc,
                showForm, 
                related: state.related,
                interlocks: state.interlocks,
                alarmasyeventos: state.alarmasyeventos,
                getTagsDescriptors,
                createTagDescriptor,
                showError, 
                selectTagDescriptor,
                deleteTagDescriptor,
                getTagDescriptor,
                deselectTagDescriptor,
                updateTagDescriptor,
                searchTagsDescriptors,
                getTagDescriptorsRelated,
                resetMessage,
                validateTagname,
                createDocument,
                selectOnlyDescriptor,
                getInterlocks,
                getAlarmayEventos,
                getAllTagDescriptor,
                getFotos
            }}
        >

            {props.children}
        </tagDescriptorContext.Provider>
    )

}

export default TagDescriptorState;