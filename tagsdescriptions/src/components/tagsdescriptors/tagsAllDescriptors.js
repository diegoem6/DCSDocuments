import React, {useContext, useEffect} from 'react';
import authContext from '../../context/auth/authContext'
import Header from '../../layout/header'
import NewTagDescriptor from './newTagDescriptorSearch';
import TagAllDescriptorList from'./tagAllDescriptorList'
import SearchAllTagDescriptor from './searchAllTagDescriptor';
import SidebarDescriptors from '../../layout/sidebarDescriptors';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext';
import systemContext from '../../context/system/systemContext';
import alertContext from '../../context/alerts/alertContext';


const Tagsdescriptors = () => {

    const auContext = useContext(authContext)
    const {getUser} = auContext;

    const tContext = useContext(tagDescriptorContext)
    const {form} = tContext

    const sContext = useContext(systemContext)
    const {deselectSystem} = sContext

    const aContext = useContext(alertContext)
    const {alert} = aContext


    useEffect(() => {
        getUser();
        deselectSystem();
        // eslint-disable-next-line
    }, [])
    
    
    return ( 
          <div className="contenedor-app">
              {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null}
              {/*form && <SidebarDescriptors/>*/}
              
              <div className="seccion-principal">
                  <Header/>
                  
                  <main>
                      <SearchAllTagDescriptor/>
                      
                      <div className="contenedor-tareas">
                          
                      {form ?
                                (<NewTagDescriptor/>)
                                :
                                (<TagAllDescriptorList/>)
                            }
                
                      </div>
                  </main>
              </div>
          </div>
    );
}
 
export default Tagsdescriptors;