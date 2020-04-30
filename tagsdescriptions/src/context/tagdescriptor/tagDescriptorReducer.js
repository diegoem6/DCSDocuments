import {
    FORM_TAGDESCRIPTOR, 
    GET_TAGDESCRIPTOR,
    CREATE_TAGDESCRIPTOR,
    SHOW_ERROR_TAGDESCRIPTOR,
    VALIDATE_TAGDESCRIPTOR,
    SELECT_TAGDESCRIPTOR,
    DELETE_TAGDESCRIPTOR} from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        case FORM_TAGDESCRIPTOR:
            return ({
                ...state,
                form:true,
                error:false
            })
        case GET_TAGDESCRIPTOR:
            return ({
                ...state,
                tagdescriptor:action.payload
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
                message:action.payload
            })
        default:
                return state;
    }
}