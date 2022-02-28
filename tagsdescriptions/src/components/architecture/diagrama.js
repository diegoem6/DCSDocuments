/* Este es el genera, que dibuja la arquitectura o dibuja el detalle de switches, routers o firewall */

import React, { useState, useEffect, useContext } from 'react';
import NodeCore from './nodecore';
import Architecture from './architecture';
import networkContext from "../../context/network/networkContext";

import architectureDevices from './architecturedevices'
import architecture from './architecture'

import ReactFlow, {
  removeElements,
  addEdge,
  isEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';
import Header from '../../layout/header';


const Diagrama = ({architecturedevice}) => {

  
  //const architecturedevice=localStorage.getItem('architecturedevice');
  
  const tContext = useContext(networkContext)
  const {getNetworkArchitectureDevices, getNetworkArchitectureNodes, networkArchitectureDevices, networkArchitectureNodes} = tContext
  const [elements, setElements] = useState(architecture);
  
   useEffect(()=>{
    if(networkArchitectureDevices.length !== 0){ //si el array no esta vacío, carga devices
      console.log("Entro ", networkArchitectureDevices)
      //hay que hacer este use Effect en architecture
      //architecture(networkArchitectureDevices)
      setElements(architecture(networkArchitectureDevices))
      //console.log("Los elementos son: ",elements)
    }
    else{
      //console.log("ELSE")
      //getNetworkArchitectureNodes() //tengo que cargar los nodos
      //setElements(architecture)
    }
  }, [networkArchitectureDevices])
  

  useEffect(() => {
    console.log("Entro")
    getNetworkArchitectureNodes()
    // eslint-disable-next-line
  }, [])

  useEffect(()=>{
    console.log("Los nodos son: ",networkArchitectureNodes)
    if(networkArchitectureNodes.nodes){ //verifico si trajo algun nodo
      setElements(architecture(networkArchitectureNodes))
      //architecture(networkArchitectureNodes)
    }
    else{
      console.log("no hay nodos")
    }
  },[networkArchitectureNodes]) //poner entre corchetes
  
  useEffect(()=>{
    //console.log("Los elementos son: ",elements)
  }, elements)

  const initBgColor = '#1A192B';

  const nodeTypes = {
    Botones: NodeCore,
  };

  const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
  };

  
//  const [archdevices, setArchdevices] = useState(ArchitectureDevices)

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  
  //del customNode:
  const onNodeDragStop = (event, node) => console.log('drag stop', node);
  const onElementClick = (event, element) => console.log('click', element);



  return (
    
    /*<h1>Hola</h1>*/
    <div>
      <Header />
      <h1>Arquitectura de red</h1>  
        <div className='contenedor'>
          {(elements) ? //si tengo algo en elements, muestro el diagrama
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
          :
            <p>No hay nada para mostrar</p>
            //(getNetworkArchitectureNodes())
            //(funcionBorrar())
          }
        </div>
    </div>
  );
};

export default Diagrama;