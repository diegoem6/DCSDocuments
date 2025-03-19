import React, {useReducer} from 'react';
import authContext from './authContext'
import authReducer from './authReducer'
import axiosClient from '../../config/axios'
import tokenAuth from '../../config/token'

import {
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    GET_USER, 
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOG_OFF,
    RESET_MESSAGE} from '../../types/index'

const AuthState = (props) => {
    const initialState ={
        token: localStorage.getItem('token'),
        authenticated: null,
        user_is_created: null,
        user: null,
        message:null,
        loading:true
    }
    const [state,dispatch] = useReducer(authReducer,initialState)

    const createUser = async (user) =>{
        try {
            const res = await axiosClient.post('api/users', user)
            dispatch({
                type:CREATE_USER_SUCCESS,
                payload:res.data
            })
        } catch (error) {
            console.log(error);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type:CREATE_USER_ERROR,
                payload:alert
            })
        }
    }

    const getUser = async ()=>{
        const token = localStorage.getItem('token');
        if (token){
            tokenAuth(token);
        }
        try {
            const res = await axiosClient.get('/api/auth')
            dispatch({
                type:GET_USER,
                payload:res.data.user
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
            
        }
    }


    const logOff = () =>{
        dispatch({
            type:LOG_OFF
        })
    }

    const loginUser = async (user)=>{
        console.log("Datos recibidos:", user);
        try {
            // Primero verificamos la conexión con AD
            const resAD = await axiosClient.post('/api/authAD/login', user)
            //console.log("Respuesta AD:", resAD.data);
            
            if (resAD.data.ok){
                // Si la autenticación AD es exitosa, procedemos con el login normal
                const res = await axiosClient.post('/api/auth', user)
                //console.log("Respuesta login:", res.data);
                
                dispatch({
                    type:LOGIN_SUCCESS,
                    payload:res.data
                })
                
                // Obtenemos la información del usuario
                getUser()
            } else {
                throw new Error('Error en la autenticación con Active Directory')
            }
        } catch (error) {
           // console.log("Error al iniciar sesión", error);
            const alert = {
                msg: error.response?.data?.msg || 'Error al iniciar sesión',
                category: 'alerta-error'
            }
            dispatch({
                type:LOGIN_ERROR,
                payload:alert
            })
        }
    }

    const resetMessage = () =>{
        dispatch({
            type:RESET_MESSAGE
        })
    }

    return (
        <authContext.Provider 
        value={{
            token:state.token,
            authenticated:state.authenticated,
            user:state.user,
            message:state.message,
            loading:state.loading,
            user_is_created:state.user_is_created,
            createUser,
            loginUser,
            getUser,
            logOff,
            resetMessage
        }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;

