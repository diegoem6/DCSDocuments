import {
    SHOW_FORM_DEVICE, 
    CREATE_DEVICE,
    GET_DEVICES,
    GET_DEVICE,
    SHOW_ERROR,
    DELETE_DEVICE,
    SELECT_DEVICE,
    UPDATE_DEVICE,
    GET_DEVICE_TYPES,
    GET_DEVICE_TYPE,
    RESET_MESSAGE
    } from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        case SHOW_FORM_DEVICE:
            return ({
                ...state,
                form:!state.form,
                message:''
            })
        case CREATE_DEVICE:
            return ({
                ...state,
                form:!state.form,
                message:''
            })
        case GET_DEVICES:
            return ({
                ...state, 
                devices:action.payload,
                deviceSelected: null,
                error:false,
                message:null
            })
        case GET_DEVICE: /*haciendo*/
            return ({
                ...state,
                deviceSelected: action.payload,
                error:false,
                message:null
        })
        case DELETE_DEVICE:
            return({
                ...state,
                devices: state.devices.filter(
                    device=>device._id !== action.payload
                ),
                deviceSelected: null,
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

        case SELECT_DEVICE:
            return ({
                ...state,
                deviceSelected: state.devices.filter( /*devices tiene el listado de switches*/
                    device => device._id === action.payload),
                error:false
            })
        case UPDATE_DEVICE:
            return({
                ...state,
                deviceSelected:null,
                form:!state.form,
                error:false
            })
        case GET_DEVICE_TYPES:
            return({
                ...state,
                devicetypes: action.payload
            })
        case GET_DEVICE_TYPE:
            return({
                ...state,
                devicetype: action.payload
            })
        default:
            return state;
    }
}

