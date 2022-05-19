import {
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
    UPDATE_USER_ERROR,
    RESET_MESSAGE,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR
    } from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        
        case GET_USERS_SUCCESS:
            return ({
                ...state,
                users: action.payload,
            })
        case GET_USERS_ERROR:
            return({
                ...state,
                users: [],
                message:action.payload,
            })
        
        case UPDATE_USER_ERROR:
            return({
                ...state,
                message:action.payload,
            })
        case RESET_MESSAGE:
            return ({
                ...state, 
                message:null
            })
        default: 
            return state;
    }
}
