import React, {useContext, useEffect} from 'react';
import authContext from '../../context/auth/authContext'
import Header from '../../layout/header'
import Sidebar from '../../layout/sidebar'
import NewTagDescriptor from './newTagDescriptor';
import TagDescriptorList from'./tagDescriptorList'
import SearchTagDescriptor from './searchTagDescriptor';
import SidebarDescriptors from '../../layout/sidebarDescriptors';
import tagDescriptorContext from '../../context/tagdescriptor/tagDescriptorContext';



const Tagsdescriptors = () => {

    const auContext = useContext(authContext)
    const {user,getUser} = auContext;

    const tContext = useContext(tagDescriptorContext)
    const {form} = tContext

    useEffect(() => {
        getUser()
    }, [])
    
    return ( 
          <div className="contenedor-app">
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