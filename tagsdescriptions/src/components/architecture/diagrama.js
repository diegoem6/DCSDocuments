/* Este es el genera, que dibuja la arquitectura o dibuja el detalle de switches, routers o firewall */

import React, { useState, useEffect } from 'react';
import NodeCore from './nodecore';
import Architecture from './architecture';

import ReactFlow, {
  removeElements,
  addEdge,
  isEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';
import Header from '../../layout/header';



const connectionLineStyle = { stroke: '#fff' };
const initBgColor = '#1A192B';

const nodeTypes = {
  Botones: NodeCore,
};

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const Diagrama = () => {
  const [elements, setElements] = useState(Architecture);
  
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  
  const [zoomOnScroll, setZoomOnScroll] = useState(true);

  //del customNode:
  const onNodeDragStop = (event, node) => console.log('drag stop', node);
  const onElementClick = (event, element) => console.log('click', element);
  const [bgColor, setBgColor] = useState(initBgColor);




  return (
    
    /*<h1>Hola</h1>*/
    <div>
      <Header />
      <h1>Arquitectura de red</h1>  
        <div className='contenedor'>
          <ReactFlow
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onLoad={onLoad}
            
            //del customNode:
            onElementClick={onElementClick}
            onNodeDragStop={onNodeDragStop}
            nodeTypes={nodeTypes}
            //connectionLineStyle={connectionLineStyle}
            //snapToGrid={true}
            //snapGrid={[150, 150]}
            //zoomOnScroll={zoomOnScroll}

          >
            <MiniMap //este es para el mapa de abajo a la derecha
              nodeStrokeColor={(n) => {
                if (n.style?.background) return n.style.background;
                if (n.type === 'input') return '#0041d0';
                if (n.type === 'output') return '#ff0072';
                //if (n.type === 'selectorNode') return '#cccccc';
                if (n.type === 'default') return '#1a192b';

                return '#eee';
              }}
              nodeColor={(n) => {
                if (n.style?.background) return n.style.background;
                return '#fff';
              }}
              nodeBorderRadius={2}
            />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
    </div>
  );
};

export default Diagrama;