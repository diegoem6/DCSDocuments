import {
    FORM_TAGDESCRIPTOR, 
    GET_TAGDESCRIPTOR,
    GET_TAGSDESCRIPTORS,
    CREATE_TAGDESCRIPTOR,
    SHOW_ERROR_TAGDESCRIPTOR,
    VALIDATE_TAGDESCRIPTOR,
    SELECT_TAGDESCRIPTOR,
    DESELECT_TAGDESCRIPTOR,
    DELETE_TAGDESCRIPTOR,
    UPDATE_TAGDESCRIPTOR,
    SEARCH_TAGSDESCRIPTORS} from '../../types/index'

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
                tagdescriptor:action.payload
            })
        case GET_TAGSDESCRIPTORS:
            return ({
                ...state,
                searchtagdescriptors: action.payload,
                tagdescriptors:action.payload
            })
        case CREATE_TAGDESCRIPTOR:
            return ({
                ...state,
                tagdescriptors:[...state.tagdescriptors, action.payload],
                form:false,
                error:false
            })
        case VALIDATE_TAGDESCRIPTOR:
            return ({
                ...state,
                error:true
            })
        case SELECT_TAGDESCRIPTOR:
            return ({
                ...state,
                tagdescriptor: state.tagdescriptors.filter(
                    tagdescriptor => tagdescriptor._id === action.payload)
            })
        case DELETE_TAGDESCRIPTOR:
            return ({
                ...state,
                tagdescriptors: state.tagdescriptors.filter(
                    tagdescriptor=>tagdescriptor._id !== action.payload
                ),
                tagdescriptor: null
            })
        case SHOW_ERROR_TAGDESCRIPTOR:
            return ({
                ...state,
                message:action.payload.msg,
                error:true
            })
        case DESELECT_TAGDESCRIPTOR:
            return ({
                ...state,
                form:false,
                tagdescriptor:null
            })
        case UPDATE_TAGDESCRIPTOR:
            return ({
                ...state,
                form:false,
                tagdescriptor:null
            })
        case SEARCH_TAGSDESCRIPTORS:
            return ({
                ...state,
                searchtagdescriptors: state.tagdescriptors.filter(
                    tagdescriptor=> tagdescriptor.tagname.indexOf(action.payload) > -1
                ),
                tagdescriptor: null,
                form:false
            })

        default:
                return state;
    }
}