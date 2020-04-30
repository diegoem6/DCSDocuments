import React, {useContext, useEffect} from 'react';
import authContext from '../../context/auth/authContext'
import Header from '../../layout/header'
import Sidebar from '../../layout/sidebar'
import NewTagDescriptor from './newTagDescriptor';
import SearchTagDescriptor from './searchTagDescriptor';



const Tagsdescriptors = () => {

    const auContext = useContext(authContext)
    const {user,getUser,logoff} = auContext;

    useEffect(() => {
        getUser()
    }, [])
    
    return ( 
       
            <div className="seccion-principal">
                {/*<Header/>*/}
                <main>
                  {/* <FormTarea/> */}
                    <SearchTagDescriptor/>
                    
                    <div className="contenedor-tareas">
                        <NewTagDescriptor/>
                      {/*  <ListadoTareas/> */}
                    </div>
                </main>
            </div>
     );
}
 
export default Tagsdescriptors;