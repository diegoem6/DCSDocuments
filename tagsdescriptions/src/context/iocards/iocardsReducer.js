import {
    SHOW_FORM_IOCARD, 
    CREATE_IOCARD,
    GET_IOCARDS,
    GET_IOCARD,
    SHOW_ERROR,
    DELETE_IOCARD,
    SELECT_IOCARD,
    UPDATE_IOCARD,
    GET_IOCARD_TYPES,
    GET_IOCARD_TYPE,
    GET_IOCARD_CONTROLLERS,
    GET_IOCARD_CONTROLLERS_SINB,
    GET_IOCARD_CABINETS,
    RESET_MESSAGE,
    GET_IOCARD_STATUS,
    SEARCH_IOCARD,
    GET_IOCARD_NODE_ID,
    DESELECT_IOCARD_NODE_ID,
    GET_IOCARDS_CONTROLLER_A,
    GET_IOCARDS_CONTROLLER_B
    } from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        case SHOW_FORM_IOCARD:
            return ({
                ...state,
                form:!state.form,
                message:''
            })
        case CREATE_IOCARD:
            return ({
                ...state,
                form:!state.form,
                message:''
            })
        case GET_IOCARDS:
            return ({
                ...state, 
                iocards:action.payload,
                iocardsSearch:action.payload,
                iocardsSelected: null,
                error:false,
                message:null
            })
        case GET_IOCARD: /*haciendo*/
            return ({
                ...state,
                deviceSelected: action.payload,
                error:false,
                message:null
        })
        case DELETE_IOCARD:
            return({
                ...state,
                iocards: state.iocards.filter(
                    iocards=>iocards._id !== action.payload
                ),
                iocardsSearch:state.iocards.filter(
                    iocards=>iocards._id !== action.payload
                ),
                iocardsSelected: null,
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
        case SELECT_IOCARD:
            return ({
                ...state,
                iocardsSelected: state.iocards.filter( /*devices tiene el listado de switches*/
                    iocard => iocard._id === action.payload),
                error:false
            })
        case UPDATE_IOCARD:
            return({
                ...state,
                iocardSelected:null,
                form:!state.form,
                error:false
            })
        case GET_IOCARDS_CONTROLLER_A:
        case GET_IOCARDS_CONTROLLER_B:
        case GET_IOCARD_CONTROLLERS_SINB:
        case GET_IOCARD_CONTROLLERS: //levanta todos los C300
            return({
                ...state,
                iocardcontrollers: action.payload
            })
        case GET_IOCARD_CABINETS: //levanto todos los gabinetes
            return({
                ...state,
                iocardcabinets: action.payload
            })
        case GET_IOCARD_TYPES: ////levanta todos los tipos de IOCards
            return({
                ...state,
                iocardtypes: action.payload
            })
        case GET_IOCARD_TYPE:
            return({
                ...state,
                devicetype: action.payload
            })
        case GET_IOCARD_NODE_ID:
            return({
                ...state,
                deviceID: action.payload
            })
        case DESELECT_IOCARD_NODE_ID:
            return({
                ...state,
                deviceID: null
            })
        case GET_IOCARD_STATUS:
            return({
                ...state,
                message:null,
                error: false,
                status: action.payload
            })
        case SEARCH_IOCARD:
            return ({
                ...state,
                iocardsSearch: state.iocards.filter(
                    iocards=> iocards.tagname.toUpperCase().indexOf(action.payload.toUpperCase()) > -1
                ),
                message:null,
                error: false,
            })
        default:
            return state;
    }
}

