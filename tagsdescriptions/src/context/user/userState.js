import React, {useReducer} from 'react';
import userContext from './userContext'
import userReducer from './userReducer'
import axiosClient from '../../config/axios'
import tokenAuth from '../../config/token'

import {
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    RESET_MESSAGE,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR
    } from '../../types/index'

const UserState = (props) => {
    const initialState ={
        users: [],
        message:null,
    }
    const [state,dispatch] = useReducer(userReducer,initialState)

    const getUsers = async () =>{
        try {
            const res = await axiosClient.get('api/users')
            dispatch({
                type:GET_USERS_SUCCESS,
                payload:res.data.users
            })

        } catch (error) {
            console.log(error);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type:GET_USERS_ERROR,
                payload:alert
            })
            
        }
        
        
    }


    const updateUser = async (user) =>{
        try {
            
            await axiosClient.put(`/api/users/changeState/${user._id}`,user)
            
            dispatch({
                type:UPDATE_USER_SUCCESS
            })

            getUsers()
        } catch (error) {
            console.log(error);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type:UPDATE_USER_ERROR,
                payload:alert
            })
            
        }
    }
    
    const deleteUser = async (user) =>{
        try {
            const id = user._id
            const idUser = user._id
            await axiosClient.delete(`/api/users/${id}`, {params:{idUser}})
            dispatch({
                type:DELETE_USER_SUCCESS,
            })

            getUsers()
        } catch (error) {
            console.log(error);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type:DELETE_USER_ERROR,
                payload:alert
            })
            
        }
    }

    const changePassword = async (password) =>{
        try {
            console.log("fumo?")
            await axiosClient.put(`/api/users/changePassword`,password)
            
            dispatch({
                type:CHANGE_PASSWORD_SUCCESS
            })

            getUsers()
        } catch (error) {
            console.log(error);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type:CHANGE_PASSWORD_ERROR,
                payload:alert
            })
            
        }
    }
    
    const resetMessage = ()=>{
        dispatch({
            type:RESET_MESSAGE
        })
    }

    return (
        <userContext.Provider 
        value={{
            users:state.users,
            message:state.message,
            getUsers,
            updateUser,
            deleteUser,
            resetMessage,
            changePassword
        }}>
            {props.children}
        </userContext.Provider>
    )

}
export default UserState;

