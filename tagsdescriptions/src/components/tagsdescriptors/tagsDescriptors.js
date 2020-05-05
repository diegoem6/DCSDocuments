import React, {useContext, useEffect} from 'react';
import authContext from '../../context/auth/authContext'
import Header from '../../layout/header'
import Sidebar from '../../layout/sidebar'
import NewTagDescriptor from './newTagDescriptor';
import TagDescriptorList from'./tagDescriptorList'
import SearchTagDescriptor from './searchTagDescriptor';
import SidebarDescriptors from '../../layout/sidebarDescriptors';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext';
import systemContext from '../../context/system/systemContext';
import alertContext from '../../context/alerts/alertContext';



const Tagsdescriptors = () => {

    const auContext = useContext(authContext)
    const {user,getUser} = auContext;

    const tContext = useContext(tagDescriptorContext)
    const {form, message, resetMessage} = tContext

    const sContext = useContext(systemContext)
    const {deselectSystem} = sContext

    const aContext = useContext(alertContext)
    const {alert,showAlert} = aContext


    useEffect(() => {
        getUser();
        deselectSystem();
    }, [])
    
    useEffect(() => {
        if (message){
            showAlert(message.msg,message.category)
            resetMessage();
        }
    }, [message])

    return ( 
          <div className="contenedor-app">
              {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null}
              <SidebarDescriptors/>
              
              <div className="seccion-principal">
                  <Header/>
                  
                  <main>
                      <SearchTagDescriptor/>
                      
                      <div className="contenedor-tareas">
                          
                            {form ?
                                (<NewTagDescriptor/>)
                                :
                                (<TagDescriptorList/>)
                            }

                      </div>
                  </main>
              </div>
          </div>
    );
}
 
export default Tagsdescriptors;