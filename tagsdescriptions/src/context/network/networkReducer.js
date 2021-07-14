import {
    SHOW_FORM_NETWORK, 
    CREATE_NETWORK_NODE,
    GET_NETWORK_NODES,
    GET_NETWORK_NODE,
    SHOW_ERROR,
    DELETE_NETWORK_NODE,
    SELECT_NETWORK_NODE,
    UPDATE_NETWORK_NODE,
    GET_NETWORK_MODELS,
    GET_NETWORK_MODEL,
    RESET_MESSAGE
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
                networkNodes:action.payload,
                networkNodeSelected: null,
                error:false,
                message:null
            })
        case GET_NETWORK_NODE: /*haciendo*/
            return ({
                ...state,
                networkNodeSelected: action.payload,
                error:false,
                message:null
        })
        case DELETE_NETWORK_NODE:
            return({
                ...state,
                networkNodes: state.networkNodes.filter(
                    networkNode=>networkNode._id !== action.payload
                ),
                networkNodeSelected: null,
                error:false
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

        case SELECT_NETWORK_NODE:
            return ({
                ...state,
                networkNodeSelected: state.networkNodes.filter( /*networkNodes tiene el listado de switches*/
                    networkNode => networkNode._id === action.payload),
                error:false
            })
        case UPDATE_NETWORK_NODE:
            return({
                ...state,
                networkNodeSelected:null,
                form:!state.form,
                error:false
            })
        case GET_NETWORK_MODELS:
            return({
                ...state,
                networkmodelos: action.payload
            })
        case GET_NETWORK_MODEL:
            return({
                ...state,
                networkmodelo: action.payload
            })
        default:
            return state;
    }
}

