import {
    CREATE_CONNECTION,
    GET_CONNECTIONS,
    DELETE_CONNECTION,
    SEARCH_CONNECTIONS,
    SHOW_ERROR,
    RESET_MESSAGE
    } from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        case CREATE_CONNECTION:
            return ({
                ...state,
                connections:[...state.connections,action.payload],
                connectionsSearch:[...state.connectionsSearch,action.payload],
                error:false,
                message:null
            })
        
        case GET_CONNECTIONS:
            return ({
                ...state, 
                connections:action.payload,
                connectionsSearch:action.payload,
                error:false,
                message:null
            })
        case DELETE_CONNECTION:
            return({
                ...state,
                connections: state.connections.filter(
                    connection=>connection._id !== action.payload
                ),
                connectionsSearch:state.connectionsSearch.filter(
                    connection=>connection._id !== action.payload
                ),
                error:false,
                message:null
            })
        
        case RESET_MESSAGE:
            return ({
                ...state,
                message:null,
                error:false
            })
        
        case SEARCH_CONNECTIONS:
            return ({
                ...state,
                connectionsSearch: state.connections.filter(
                    connection=> (connection.source.toUpperCase().indexOf(action.payload.toUpperCase()) > -1 
                    //||
                    //    connection.target.toUpperCase().indexOf(action.payload.toUpperCase()) > -1
                    )
                ),
                message:null,
                error: false,
            })
        case SHOW_ERROR:
            return ({
                ...state,
                message:action.payload,
                error:true
            })
            
        default:
            return state;
    }
}

