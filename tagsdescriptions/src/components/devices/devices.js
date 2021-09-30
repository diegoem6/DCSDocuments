import React, {useContext, useEffect} from 'react';

import Header from '../../layout/header'
import NewDevice from '../devices/newDevice';
import DeviceList from'../devices/devicesList'

import HeaderDevice from '../devices/headerDevices';
import SidebarNetwork from '../../layout/sidebarNetwork';
import deviceContext from '../../context/devices/devicesContext';
import authContext from '../../context/auth/authContext'
import alertContext from '../../context/alerts/alertContext';
import assetContext from '../../context/asset/assetContext';

const Devices = ()=>{

    const auContext = useContext(authContext)
    const {getUser} = auContext;
    
    const dContext = useContext(deviceContext)
    const {showForm, form} = dContext
    
    const asContext = useContext(assetContext)
    const {deSelectAsset} = asContext
    
    const aContext = useContext(alertContext)
    const {alert} = aContext
    
    
    useEffect(() => {
        getUser();
        deSelectAsset();
        // eslint-disable-next-line
    }, [])

    return(
        <div className="contenedor-app">
              {/*alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null*/}
              <SidebarNetwork
                tipo="Devices"
              />
              
              <div className="seccion-principal">
                  <Header/>
                  
                  <main>
                      <HeaderDevice/>
                      
                      <div className="contenedor-tareas">
                          
                            {//<NewDevice/> //agrego esto y tira errror!!!!
                            form ?
                                (<NewDevice/>)
                                :
                                (<DeviceList/>)
                            }

                      </div>
                  </main>
              </div>
          </div>
    );
}

export default Devices;