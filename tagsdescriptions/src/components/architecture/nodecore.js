/*Para switches, firewealls y routers*/ 
import React, { memo, useContext, useEffect } from 'react';

import { Handle } from 'react-flow-renderer';
import networkContext from '../../context/network/networkContext'
import deviceContext from '../../context/devices/devicesContext'
import Diagrama from './diagrama';

export default memo(({ data, isConnectable }) => {
  //console.log(data.posin, data.posout.uno)
  
  const tContext = useContext(networkContext)
  const {getNetworkNodeID, networkNodeID, getNetworkArchitectureDevices, networkArchitectureDevices} = tContext //getNetworkNode 
  
  const dContext = useContext(deviceContext)
  const {getDeviceID, deviceID} = dContext //getNetworkNode 

  useEffect(()=>{
    if(networkArchitectureDevices){
      console.log("Entro 25 veces!!!!")
      //<Diagrama />
    }
  }, [networkArchitectureDevices])

  useEffect(()=>{ //para mostrar el status:
    if ((networkNodeID  !== localStorage.getItem('devicestatusID')) && networkNodeID){ //si no agrego la comparacion con lo que habia antes, entra 24 veces! que onda el useEffect, hace lo que quiere...
      localStorage.setItem('devicestatusID',networkNodeID)
      window.open('/networkstatus')
    }
  },[networkNodeID])
  
  useEffect(()=>{ //para mostrar el status:
    if ((deviceID  !== localStorage.getItem('devicestatusID')) && deviceID){ //si no agrego la comparacion con lo que habia antes, entra 24 veces! que onda el useEffect, hace lo que quiere...
      localStorage.setItem('devicestatusID',deviceID)
      window.open('/devicestatus')
    }
  },[deviceID])

  return (
    <>
      {(data.posin) ?
        <Handle
        type="target"
        position={data.posin}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
        />
        :
        (null)
      }
      <div className='architecture_node_div'>


        <label className={data.cName}><strong><center>{data.equipo}</center></strong></label>
        {/* <img className="img_architecture_node" src={data.img}/> */}
        {((data.devicetype) === 'Switch') ?
          <img className="img_architecture_node" src={data.img}/>
          :
          <img className="img_architecture_device" src={data.img}/>
        }
      </div>
        {((data.devicetype) === 'Switch') ?
          <input
            className={data.cName}
            type="button"
            value="Connections"
            onClick={()=>
              {   
                  getNetworkArchitectureDevices(data.equipo)
              }
              /*<NetworkStatus />*/
            }
            defaultValue={data.color}
          />
        :
          (null)
        }
        
        {((data.devicetype) === 'Switch') ?
          <input
          className={data.cName}
          type="button"
          //style="background-color: black; color : white;"
          value="       Status       "
          defaultValue={data.color}
          onClick={()=>
            {   
                getNetworkNodeID(data.equipo)
                //getNodeID(data.equipo) //levanto el id del nodo
                //localStorage.setItem('devicestatusID',networkNodeID) //guardo en el localstorage una variable networkstatusID con el dato networkNode._id
                //window.open('/networkstatus') // /events esta definido en app.js
            }
            /*<NetworkStatus />*/
          }
          />
        
      :
        (null)
      }
      
      {(((data.devicetype) === 'CF9' || (data.devicetype) === 'C300' || (data.devicetype) === 'PGM')) ?
          <input
          className={data.cName}
          type="button"
          //style="background-color: black; color : white;"
          value="       Status       "
          defaultValue={data.color}
          onClick={()=>
            {   
                getDeviceID(data.equipo)
                //getNodeID(data.equipo) //levanto el id del nodo
                //localStorage.setItem('devicestatusID',networkNodeID) //guardo en el localstorage una variable networkstatusID con el dato networkNode._id
                //window.open('/networkstatus') // /events esta definido en app.js
            }
            /*<NetworkStatus />*/
          }
          />
        
      :
        (null)
      }

      {(data.posout) ?
        <Handle
          type="source"
          position={data.posout}
          id="a"
          //style={{ top: 10, background: '#555' }}
          style={{ background: '#555' }}
          isConnectable={isConnectable}
        />
        :
        (null)
      }

    </>

  );
});