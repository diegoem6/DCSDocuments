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
    LOG_OFF} from '../../types/index'

const AuthState = (props) => {
    const initialState ={
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message:null,
        loading:true
    }
    const [state,dispatch] = useReducer(authReducer,initialState)

    const createUser = async (user) =>{
        try {
            console.log(user);
            const res = await axiosClient.post('api/users', user)
            dispatch({
                type:CREATE_USER_SUCCESS,
                payload:res.data
            })

            getUser()
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
        try {
            console.log(user)
            const res = await axiosClient.post('/api/auth', user)
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })

            getUser()
            
        } catch (error) {
            console.log(error);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type:LOGIN_ERROR,
                payload:alert
            })
            
        }
    }

    return (
        <authContext.Provider 
        value={{
            token:state.token,
            authenticated:state.authenticated,
            user:state.user,
            message:state.message,
            loading:state.loading,
            createUser,
            loginUser,
            getUser,
            logOff
        }}>
            {props.children}
        </authContext.Provider>
    )

}
export default AuthState;

