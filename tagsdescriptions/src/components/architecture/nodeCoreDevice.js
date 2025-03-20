/*Para switches, firewealls y routers*/ 
import React, { memo, useContext, useEffect } from 'react';
import { Handle } from 'reactflow';
import networkContext from '../../context/network/networkContext'
import deviceContext from '../../context/devices/devicesContext'

export default memo(({ data, isConnectable }) => {
 
  const tContext = useContext(networkContext)
  const {deselectNetworkNodeId, getNetworkNodeID, networkNodeID} = tContext //getNetworkNode 
  
  const dContext = useContext(deviceContext)
  const {getDeviceID} = dContext //getNetworkNode 


  useEffect(()=>{ //para mostrar el status:
    //console.log("AAAAAAAAAA")
    if ((networkNodeID  !== localStorage.getItem('networkstatusID')) && networkNodeID){
      //si no agrego la comparacion con lo que habia antes, entra 24 veces! que onda el useEffect, hace lo que quiere...
      localStorage.setItem('networkstatusID',networkNodeID)
      deselectNetworkNodeId();
      window.open('/networkstatus', "_blank")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[networkNodeID])
  
  /*useEffect(()=>{ //para mostrar el status:
    if ((deviceID  !== localStorage.getItem('devicestatusID')) && deviceID){ //si no agrego la comparacion con lo que habia antes, entra 24 veces! que onda el useEffect, hace lo que quiere...
      localStorage.setItem('devicestatusID',deviceID)
      deselectDeviceId()
      window.open('/devicestatus', "_blank")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[deviceID])*/
  
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
                getNetworkNodeID(data.equipo)
            }
          }
          />
        
      :
        (null)
      }
      </div>


      {(((data.devicetype) === 'CF9' || (data.devicetype) === 'PGM')) ?
          <input
          className={data.cName}
          type="button"
          value="       Status       "
          defaultValue={data.color}
          onClick={()=>
            {   
                //getDeviceID(data.equipo)
            }
          }
          />
        
      :
        (null)
      }
      
      {((data.devicetype) === 'C300')?
        <div className="div_buttons_architecture_devices" //aca tengo que poner una clase para que un boton quede abajo del otro
        >
        {/* 
        Cuando se termine de definir lod e las iocard este botón llama a las conecciones de los c300
         <input
            className={data.cName}
            type="button"
            //style="background-color: black; color : white;"
            value="Connections"
            id="btnConnections"
            defaultValue={data.color}
           // onClick={()=> {
            //No se necesita el onClick el diagrama ya captura el evento onClik
              //handleConnectionStatus(data.equipo)
              //console.log("btnConnections")
            //}
              /*<NetworkStatus />
            //}
          />
          */}
                    
          <input
            className={data.cName}
            type="button"
            //style="background-color: black; color : white;"
            value="       Status       "
            defaultValue={data.color}
            onClick={()=>
              {   
                  getDeviceID(data.equipo)
              }
            }
          />
        </div>
        :
          (null)
      }
      
      
      {(data.posout) ?
        <Handle
          type="source"
          position={data.posout}
          id="a"
          style={{ background: '#555', color:"green" }}
          isConnectable={isConnectable}
        />
        :
        (null)
      }

    </>

  );
});