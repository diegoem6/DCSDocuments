import React, {useEffect, useContext} from 'react';
import authContext from '../../context/auth/authContext'
import Header from '../../layout/header'
import Sidebar from '../../layout/sidebar'
import SystemForm from '../system/systemForm'
import SystemList from '../system/systemList'


const Assets = () => {
    const auContext = useContext(authContext)
    const {getUser} = auContext;

    useEffect(() => {
        getUser()
    }, [])
    
    return ( 
        <div className="contenedor-app">
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