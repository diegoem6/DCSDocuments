import {
    FORM_TAGDESCRIPTOR, 
    GET_TAGDESCRIPTOR,
    GET_TAGSDESCRIPTORS,
    CREATE_TAGDESCRIPTOR,
    SHOW_ERROR_TAGDESCRIPTOR,
    SELECT_TAGDESCRIPTOR,
    DESELECT_TAGDESCRIPTOR,
    DELETE_TAGDESCRIPTOR,
    UPDATE_TAGDESCRIPTOR,
    SEARCH_TAGSDESCRIPTORS,
    RESET_MESSAGE,
    VALIDATE_TAGDESCRIPTOR,
    INVALIDATE_TAGDESCRIPTOR,
    GET_TAGSDESCRIPTORS_RELATED,
    CREATE_DOCUMENT,
    SELECT_ONLY_DESCRIPTOR,
    GET_INTERLOCKS,
    GET_AYE,
    GET_FOTOS} from '../../types/index'
import { stat } from 'fs'

export default (state,action)=>{
    switch(action.type){
        case FORM_TAGDESCRIPTOR:
            return ({
                ...state,
                form:!state.form,
                error:false
            })
        case GET_TAGDESCRIPTOR:
            return ({
                ...state,
                tagdescriptor: action.payload,
                error:false
            })
        case GET_TAGSDESCRIPTORS:
            return ({
                ...state,
                searchtagdescriptors: action.payload,
                tagdescriptors: action.payload,
                interlocks:[],
                related:null,
                error:false

            })
        case GET_TAGSDESCRIPTORS_RELATED:
            return ({
                ...state,
                related: action.payload.filter (td => td.tagname !== state.tagdescriptor[0].tagname),
                error:false

            })
        case CREATE_TAGDESCRIPTOR:
            return ({
                ...state,
                tagdescriptors:[...state.tagdescriptors, action.payload],
                interlocks:[],
                related:null,
                form:false,
                error:false
            })
        case RESET_MESSAGE:
            return ({
                ...state,
                message:null
            })
        case SELECT_TAGDESCRIPTOR:
            return ({
                ...state,
                tagdescriptor: state.tagdescriptors.filter(
                    tagdescriptor => tagdescriptor._id === action.payload),
                related:null,
                interlocks:[],
                error:false
            })
        case VALIDATE_TAGDESCRIPTOR:
            return ({
                ...state,
                tagname_ok:true
            })
        case INVALIDATE_TAGDESCRIPTOR:
            return ({
                ...state,
                message: action.payload,
                tagname_ok:false
            })
        case DELETE_TAGDESCRIPTOR:
            return ({
                ...state,
                tagdescriptors: state.tagdescriptors.filter(
                    tagdescriptor=>tagdescriptor._id !== action.payload
                ),
                searchtagdescriptors: state.searchtagdescriptors.filter(
                    tagdescriptor=>tagdescriptor._id !== action.payload),
                tagdescriptor: null,
                error:false
            })
        case SHOW_ERROR_TAGDESCRIPTOR:
            return ({
                ...state,
                message:action.payload,
                error:true
            })
        case DESELECT_TAGDESCRIPTOR:
            return ({
                ...state,
                form:false,
                tagdescriptor:null,
                related:null,
                interlocks:[],
                error:false
            })
        case UPDATE_TAGDESCRIPTOR:
            return ({
                ...state,
                form:false,
                tagdescriptor:null,
                error:false
            })
        case SEARCH_TAGSDESCRIPTORS:
            return ({
                ...state,
                searchtagdescriptors: state.tagdescriptors.filter(
                    tagdescriptor=> tagdescriptor.tagname.indexOf(action.payload) > -1
                ),
                tagdescriptor: null,
                interlocks:[],
                form:false,
                error:false
            })
        case CREATE_DOCUMENT:
            return ({
                ...state,
                error:false, 
                urlDoc: action.payload
            })
        case SELECT_ONLY_DESCRIPTOR:
            return ({
                ...state,
                form: true,
                tagdescriptor: [action.payload],
                interlocks:[],
                error:false,
            })
        case GET_INTERLOCKS:
            return ({
                ...state,
                form: true,
                interlocks: [action.payload],
                error:false,
            })
        case GET_AYE:
                return ({
                    ...state,
                    form: true,
                    alarmasyeventos: [action.payload],
                    error:false,
                })
        case GET_FOTOS:
            return ({
                ...state,
                form: true,
                fotos: action.payload,
                error:false,
            })
        default:
                return state;
    }
}