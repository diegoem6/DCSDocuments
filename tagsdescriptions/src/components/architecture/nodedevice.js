/*Para switches, firewealls y routers*/ 
import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import Diagrama from './Diagrama';

const aux="left"
const funcion=()=>{
  //console.log("Entre")
}
export default memo(({ data, isConnectable }) => {
  //console.log(data.posin, data.posout.uno)
  
  
  
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
        <strong><center>{data.equipo}</center></strong>
      </div>
      <input
        className="boton"
        type="button"
        value="Connections"
        
        defaultValue={data.color}
      />
      <input
      className="boton"
      type="button"
      //style="background-color: black; color : white;"
      value="       Status       "
      onClick={()=>
        {   console.log("Entro")
            localStorage.setItem('networkstatusID',"12") //guardo en el localstorage una variable networkstatusID con el dato networkNode._id
            window.open('/networkstatus') // /events esta definido en app.js
        }
        /*<NetworkStatus />*/
    }
      defaultValue={data.color}
    />
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