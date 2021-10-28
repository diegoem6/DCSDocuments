import {
    SHOW_ERROR,
    RESET_MESSAGE,
    PROCESS_IMPORT_FILE
    } from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        
        case PROCESS_IMPORT_FILE:
            return ({
                ...state,
                message:null
            })
        case SHOW_ERROR:
            return ({
                ...state,
                message:action.payload,
                error:true
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

