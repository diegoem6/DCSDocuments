/*Para switches, firewealls y routers*/ 
import React, { memo, useContext, useEffect } from 'react';
import { Handle } from 'react-flow-renderer';
import networkContext from '../../context/network/networkContext'
import deviceContext from '../../context/devices/devicesContext'

export default memo(({ data, isConnectable }) => {
  //console.log(data.posin, data.posout.uno)
  
  const tContext = useContext(networkContext)
  const {deselectNetworkNodeId, getNetworkNodeID, networkNodeID, getArchitectureDevices} = tContext //getNetworkNode 
  
  const dContext = useContext(deviceContext)
  const {getDeviceID} = dContext //getNetworkNode 


  useEffect(()=>{ //para mostrar el status:
    console.log("network status useEffect "+networkNodeID)
    if ((networkNodeID  !== localStorage.getItem('networkstatusID')) && networkNodeID){
      //si no agrego la comparacion con lo que habia antes, entra 24 veces! que onda el useEffect, hace lo que quiere...
      localStorage.setItem('networkstatusID',networkNodeID)
      console.log("1")
      deselectNetworkNodeId();
      console.log("2")
      window.open('/networkstatus', "_blank")
      console.log("3")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[networkNodeID])
  

  const getConnectionsNetworkNode = (networkNode) => {
    getArchitectureDevices(networkNode)
    localStorage.setItem('networkNodeName',networkNode)
    window.open('/architectureDevices', "_self")
  }

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
          <img alt = "img_arch_node" className="img_architecture_node" src={data.img}/>
          :
          <img alt = "img_arch_dev" className="img_architecture_device" src={data.img}/>
        }
      </div>
      <div className='div_buttons_architecture'>
        {((data.devicetype) === 'Switch') && data.equipo !=="PMSWSY001A" && data.equipo !=="PMSWSY001B" ?
          <input
            className={data.cName}
            type="button"
            value="Connections"
            onClick={()=>
              {   
                  getConnectionsNetworkNode(data.equipo)
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
          value="Status"
          defaultValue={data.color}
          onClick={()=>
            {   
                console.log(data.equipo)
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
      </div>


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
          style={{ background: '#555', color:"green" }}
          isConnectable={isConnectable}
        />
        :
        (null)
      }

    </>

  );
});