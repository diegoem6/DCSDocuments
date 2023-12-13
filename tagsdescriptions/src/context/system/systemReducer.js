import {
    ADD_SYSTEM, 
    GET_SYSTEMS,
    UPDATE_SYSTEM,
    SELECT_SYSTEM,
    DELETE_SYSTEM,
    DESELECT_SYSTEM,
    SHOW_ERROR,
    RESET_MESSAGE,
    SELECT_SYSTEM_AND_ASSET
} from '../../types/index'

export default (state, action) =>{
    switch (action.type){
        case ADD_SYSTEM:
            return ({
                ...state, 
                systems: [...state.systems, action.payload],
                message:null
            })
        case GET_SYSTEMS:
            return ({
                ...state, 
                systems: action.payload,
                systemSelected:null,
                message:null
            })
        case UPDATE_SYSTEM:
            return ({
                ...state, 
                systemSelected:null,
                message:null
            })
        case SELECT_SYSTEM:
            return ({
                ...state, 
                systemSelected:action.payload,
                message:null
            })
        case  SELECT_SYSTEM_AND_ASSET:
                return ({
                    ...state, 
                    systemAndAssetSelected:action.payload,
                    message:null
                })
        case DESELECT_SYSTEM:
            return ({
                ...state, 
                systemSelected:null,
                message:null
            })
        case DELETE_SYSTEM:
            return ({
                ...state,
                systems: state.systems.filter((
                    system => system._id !== action.payload._id)),
                message:null,
                systemSelected:null
            })
        case SHOW_ERROR:
            return ({
                ...state,
                message:action.payload
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