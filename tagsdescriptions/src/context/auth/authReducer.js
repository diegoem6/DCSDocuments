import {
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    GET_USER, 
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOG_OFF, 
    RESET_MESSAGE} from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return({
                ...state,
                authenticated:true,
                user_is_created: false,
                message:null,
                loading:false
            })
        case CREATE_USER_SUCCESS:
            localStorage.removeItem('token')
            return({
                ...state,
                authenticated:false,
                user_is_created: true,
                message:null,
                loading:false
            })
        case GET_USER:
            return ({
                ...state,
                authenticated: true,
                user_is_created: false,
                user: action.payload,
                loading:false
            })
        case LOG_OFF:
        case LOGIN_ERROR:
        case CREATE_USER_ERROR:
            localStorage.removeItem('token')
            return({
                ...state,
                token:null,
                user: null,
                authenticated: false,
                user_is_created: false,
                message:action.payload,
                loading:false
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
