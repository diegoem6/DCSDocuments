import {
    SHOW_FORM_NETWORK, 
    CREATE_NETWORK_NODE,
    GET_NETWORK_NODES
    } from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        case SHOW_FORM_NETWORK:
            return ({
                ...state,
                form:!state.form,
                message:''
            })
        case CREATE_NETWORK_NODE:
            return ({
                ...state,
                form:!state.form,
                message:''
            })
        case GET_NETWORK_NODES:
            return ({
                ...state, 
                networkNodes: action.payload,
                networkNodeSelected:null,
                message:null
            })
        default:
            return state;
    }
}