import {
    SHOW_FORM_CABINET,
    CREATE_CABINET,
    GET_CABINETS,
    GET_CABINET,
    DELETE_CABINET,
    SELECT_CABINET,
    UPDATE_CABINETS,
    GET_AREAS,
    SHOW_ERROR_CABINET,
    RESET_MESSAGE_CABINET,
    UPLOAD_FILE_CABINETS,
    UPLOAD_FILE_CABINETS_SUCCESS,
    //UPLOAD_FILE_CABINETS_ERROR,
    DELETE_FILE_CABINETS,
    DELETE_FILE_CABINETS_SUCCESS,
    //DELETE_FILE_CABINETS_ERROR,
} from '../../types';


export default (state, action) => {
    switch (action.type) {
        case SHOW_FORM_CABINET:
            return {
                ...state,
                form: !state.form,
                message: ''
            }
        case CREATE_CABINET:

            return {
                ...state,
                cabinetSelected: action.payload.newCabinet,
                //form: !state.form,
                message: ''
            }
        case GET_CABINETS:
            return {
                ...state,
                cabinets: action.payload,
                cabinetSelected: null,
                error: false,
                message: null
            }
        case GET_CABINET:
            return {
                ...state,
                cabinetSelected: action.payload,
                error: false,
                message: null
            }
        case DELETE_CABINET:
            return {
                ...state,
                cabinets: state.cabinets.filter(
                    cabinet => cabinet._id !== action.payload
                ),
                cabinetSelected: null,
                error: false
            }
        case SELECT_CABINET:
            return {
                ...state,
                cabinetSelected: action.payload,
                error: false,
                message: null
            }
        case UPDATE_CABINETS:
            return {
                ...state,
                cabinetSelected: null,
                form: !state.form,
                error: false,
                message: null
            }
        case GET_AREAS:
            return {
                ...state,
                areas: action.payload,
                error: false,
                message: null
            }
        case SHOW_ERROR_CABINET:
            return ({
                ...state,
                message: action.payload,
                error: true
            })

        case RESET_MESSAGE_CABINET:
            return ({
                ...state,
                message: null
            })
        case UPLOAD_FILE_CABINETS:
        case DELETE_FILE_CABINETS:
            return ({
                ...state,
                message: null,
                error: false
            })
        case UPLOAD_FILE_CABINETS_SUCCESS:
        case DELETE_FILE_CABINETS_SUCCESS:
            return ({
                ...state,
                error: false,
                message: null,
                //filesSelected: action.payload
            })
        default:
            return state;
    }
}// Compare this snippet from src\context\network\networkContext.js: