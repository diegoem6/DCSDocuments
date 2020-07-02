import React, {useContext, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom'
import authContext from '../../context/auth/authContext'


const PrivateRoute = ({component: Component, ...props}) => {
    const aContext = useContext(authContext)
    const {getUser, authenticated, loading} = aContext

     useEffect(() => {
        getUser();
         // eslint-disable-next-line
     }, [])

    return ( 
        <Route {...props} render={props => !authenticated && !loading ? (
            <Redirect to ="/" />
        ):(
            <Component {...props} />
        )} 
        />
     );
}
 
export default PrivateRoute;