import React, {useEffect, useContext} from 'react';
import authContext from '../../context/auth/authContext'
import Header from '../../layout/header'
import Sidebar from '../../layout/sidebar'
import SystemForm from '../system/systemForm'
import SystemList from '../system/systemList'
import assetContext from '../../context/asset/assetContext.js'
import alertContext from '../../context/alerts/alertContext.js'



const Assets = () => {
    const auContext = useContext(authContext)
    const {getUser} = auContext;

    const asContext = useContext(assetContext)
    const {message, resetMessage} = asContext

    const aContext = useContext(alertContext)
    const {alert,showAlert} = aContext
    

    useEffect(() => {
        getUser()
        // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
        if(message){
            showAlert(message.msg, message.category)
            resetMessage();
        }
        // eslint-disable-next-line
    }, [message])

    return ( 
        <div className="contenedor-app">
            {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null}
            
            <Sidebar/>
            
            <div className="seccion-principal">
                {/* <Barra/> */}
                <Header/>
                
                <main>
                <SystemForm/>
                    
                    <div className="contenedor-tareas">
                      <SystemList/>
                      
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Assets;