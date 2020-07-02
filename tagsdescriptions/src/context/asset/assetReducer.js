import {
    FORM_ASSETS,      
    GET_ASSETS,       
    ADD_ASSET,       
    SHOW_ERROR_ASSET,
    VALIDATE_ASSET,  
    SELECT_ASSET,    
    DELETE_ASSET, 
    GET_ASSETS_TREE,
    RESET_MESSAGE } from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        case FORM_ASSETS:
            return ({
                ...state,
                form:true,
                error:false,
                message:null
            })
        case GET_ASSETS:
            return ({
                ...state,
                assets:action.payload,
                message:null
            })
        case GET_ASSETS_TREE:
            return ({
                ...state,
                assetsTree:action.payload,
                message:null
            })
        case ADD_ASSET:
            return ({
                ...state,
                assets:[...state.assets, action.payload],
                form:false,
                error:false,
                message:null
            })
        case RESET_MESSAGE:
            return ({
                ...state,
                message:null
            })
        case VALIDATE_ASSET:
            return ({
                ...state,
                error:true,
                message:null
            })
        case SELECT_ASSET:
            return ({
                ...state,
                asset: state.assets.filter(
                    asset => asset._id === action.payload._id),
                message:null
            })
        case DELETE_ASSET:
            return ({
                ...state,
                assets: state.assets.filter(
                    asset=>asset._id !== action.payload
                ),
                asset: null,
                message:null
            })
        case SHOW_ERROR_ASSET:
            return ({
                ...state,
                message:action.payload
            })
        default:
                return state;
    }
}