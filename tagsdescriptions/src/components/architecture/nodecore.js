/*Para switches, firewealls y routers*/ 
import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

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
      <div className='nodeCoreContent'>
        <strong><center className='nodeCoreLabel'>{data.equipo}</center></strong>
      </div>
      <input
        className="boton"
        type="button"
        value="Connections"
        onClick={funcion()}
        defaultValue={data.color}
      />
      <input
      className="boton"
      type="button"
      //style="background-color: black; color : white;"
      value="       Status       "
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