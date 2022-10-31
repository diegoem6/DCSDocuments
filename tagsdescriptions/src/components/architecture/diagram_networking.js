/* Este es el genera, que dibuja la arquitectura o dibuja el detalle de switches, routers o firewall */

import React, { useState, useEffect, useContext } from 'react';
import NodeCore from './nodeCoreNetwork';
import { Link } from 'react-router-dom'
import networkContext from "../../context/network/networkContext";

import architecture from './architectureNetworking'

import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
} from 'react-flow-renderer';
import Header from '../../layout/header';


const Diagram_Networking = () => {

  
  //const architecturedevice=localStorage.getItem('architecturedevice');
  
  const tContext = useContext(networkContext)
  const {getArchitectureNetworkNodes, architectureNetworkNodes} = tContext
  const [elements, setElements] = useState(architecture);
 
  useEffect(() => {
    getArchitectureNetworkNodes()
    // eslint-disable-next-line
  }, [])

  useEffect(()=>{
    if(architectureNetworkNodes.nodes){ //verifico si trajo algun nodo
      setElements(null)
      setElements(architecture(architectureNetworkNodes))
    }
  },[architectureNetworkNodes]) //poner entre corchetes
  
  const nodeTypes = {
    Botones: NodeCore,
  };

  const onLoad = (reactFlowInstance) => {
    
    reactFlowInstance.fitView();
    //reactFlowInstance.setCenter(0,0)
  };

  
//  const [archdevices, setArchdevices] = useState(ArchitectureDevices)

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  
  //del customNode:
  const onNodeDragStop = (event, node) => console.log('drag stop', node);
  const onElementClick = (event, element) => console.log('click', element);
  const back = ()=>{
    window.open("/architecture", "_self")
  }
  
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
            >
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          :
            <p>No hay nada para mostrar</p>
          }

          <div className="link-arq-div">
            <Link 
                to={'/menu'}
                className="link-menu">
            &#60;
                Menu
            </Link>
            <a href="./architecture" onClick={back} className="link-menu"> &#60; Architecture </a>
          </div>
          

        </div>
    </div>
  );
};

export default Diagram_Networking;