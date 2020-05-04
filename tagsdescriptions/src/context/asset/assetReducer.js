import {
    FORM_ASSETS,      
    GET_ASSETS,       
    ADD_ASSET,       
    SHOW_ERROR_ASSET,
    VALIDATE_ASSET,  
    SELECT_ASSET,    
    DELETE_ASSET, 
    GET_ASSETS_TREE } from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        case FORM_ASSETS:
            return ({
                ...state,
                form:true,
                error:false
            })
        case GET_ASSETS:
            return ({
                ...state,
                assets:action.payload
            })
        case GET_ASSETS_TREE:
            return ({
                ...state,
                assetsTree:action.payload
            })
        case ADD_ASSET:
            return ({
                ...state,
                assets:[...state.assets, action.payload],
                form:false,
                error:false
            })
        case VALIDATE_ASSET:
            return ({
                ...state,
                error:true
            })
        case SELECT_ASSET:
            return ({
                ...state,
                asset: state.assets.filter(
                    asset => asset._id === action.payload._id)
            })
        case DELETE_ASSET:
            return ({
                ...state,
                assets: state.assets.filter(
                    asset=>asset._id !== action.payload
                ),
                asset: null
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