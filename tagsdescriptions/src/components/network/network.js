import React, {useContext, useEffect} from 'react';
import authContext from '../../context/auth/authContext'
import Header from '../../layout/header'
import NewNodeNetwork from '../network/newNodeNetwork';
import NodesList from'../network/NodesList'
import HeaderNodeNetwork from '../network/headerNodeNetwork';
import SidebarNetwork from '../../layout/sidebarNetwork';
import alertContext from '../../context/alerts/alertContext';
import assetContext from '../../context/asset/assetContext';
import networkContext from '../../context/network/networkContext';


const Netowrk = () => {

    const auContext = useContext(authContext)
    const {getUser} = auContext;

    const nContext = useContext(networkContext)
    const {showForm, form} = nContext

    const asContext = useContext(assetContext)
    const {deSelectAsset} = asContext

    const aContext = useContext(alertContext)
    const {alert} = aContext


    useEffect(() => {
        getUser();
        deSelectAsset();
        // eslint-disable-next-line
    }, [])
    
    

    return ( 
          <div className="contenedor-app">
              {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null}
              <SidebarNetwork
                tipo="Network"
              />
              
              <div className="seccion-principal">
                  <Header/>
                  
                  <main>
                      <HeaderNodeNetwork/>
                      
                      <div className="contenedor-tareas">
                          
                            { form ?
                                (<NewNodeNetwork/>)
                                :
                                (<NodesList/>)
                            }

                      </div>
                  </main>
              </div>
          </div>
    );
}
 
export default Netowrk;