/*Para switches, firewealls y routers*/ 
import React, { memo, useContext, useEffect } from 'react';

import { Handle } from 'react-flow-renderer';
import networkContext from '../../context/network/networkContext'
import Diagrama from './diagrama';

export default memo(({ data, isConnectable }) => {
  //console.log(data.posin, data.posout.uno)
  
  const tContext = useContext(networkContext)
  const {getNetworkNodeID, networkNodeID, getNetworkArchitectureDevices, networkArchitectureDevices} = tContext //getNetworkNode 
  
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
      
      <div>
        <strong><center>{data.equipo} - {data.devicetype}</center></strong>
      </div>

      {((data.devicetype) === 'Switch') ?
        <input
          className="boton"
          type="button"
          value="Connections"
          onClick={()=>
            {   console.log("Connections ", data.equipo)
                getNetworkArchitectureDevices(data.equipo)
            }
            /*<NetworkStatus />*/
          }
          defaultValue={data.color}
        />
      :
        (null)
      }
      
      {(((data.devicetype) === 'Switch') || (data.devicetype) === 'CF9' || (data.devicetype) === 'C300' || (data.devicetype) === 'PGM') ?
        <input
        className="boton"
        type="button"
        //style="background-color: black; color : white;"
        value="       Status       "
        defaultValue={data.color}
        onClick={()=>
          {   console.log("Entro_Click")
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