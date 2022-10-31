import React, {useContext, useEffect} from 'react';

import Header from '../../layout/header'
import NewIOCard from '../iocards/newIOCard';
import IOCardsList from'../iocards/iocardsList'

import HeaderIOCards from '../iocards/headerIOCards';
import SidebarIOCards from '../../layout/sidebarIOCards';
import authContext from '../../context/auth/authContext'
import assetContext from '../../context/asset/assetContext';
import iocardContext from '../../context/iocards/iocardsContext';

const IOCards = ()=>{

    const auContext = useContext(authContext)
    const {getUser} = auContext;
    //const form = 0; //1=new car, 0 list
    const iContext = useContext(iocardContext)
    const {form} = iContext
    
    const asContext = useContext(assetContext)
    const {deSelectAsset} = asContext
    
    
    useEffect(() => {
        getUser();
        deSelectAsset();
        // eslint-disable-next-line
    }, [])

    return(
        <div className="contenedor-app">
              {/*alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null*/}
              <SidebarIOCards />
              
              <div className="seccion-principal">
                  <Header/>
                  
                  <main>
                      <HeaderIOCards/>
                      
                      <div className="contenedor-tareas">
                          
                            {
                            form ?
                                (<NewIOCard/>)
                                :
                                (<IOCardsList/>)
                            }

                      </div>
                  </main>
              </div>
          </div>
    );
}

export default IOCards;