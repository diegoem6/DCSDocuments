import {
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    GET_USER, 
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOG_OFF} from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        case LOGIN_SUCCESS:
        case CREATE_USER_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            console.log("seteando token");
            return({
                ...state,
                authenticated:true,
                message:null,
                loading:false
            })
        case GET_USER:
            return ({
                ...state,
                authenticated: true,
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
                message:action.payload,
                loading:false
            })
            
        default: 
            return state;
    }
}
