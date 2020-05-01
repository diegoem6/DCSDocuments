import {
    ADD_SYSTEM, 
    GET_SYSTEMS,
    UPDATE_SYSTEM,
    SELECT_SYSTEM,
    DELETE_SYSTEM
} from '../../types/index'

export default (state, action) =>{
    switch (action.type){
        case ADD_SYSTEM:
            return ({
                ...state, 
                systems: [...state.systems, action.payload]
            })
        case GET_SYSTEMS:
            return ({
                ...state, 
                systems: action.payload,
                systemSelected:null
            })
        case UPDATE_SYSTEM:
            return ({
                ...state, 
                systemSelected:null
            })
        case SELECT_SYSTEM:
            return ({
                ...state, 
                systemSelected:action.payload
            })
        case DELETE_SYSTEM:
            return ({
                ...state,
                systems: state.systems.filter((
                    system => system._id !== action.payload._id))
            })
        default:
            return state;
    }
}