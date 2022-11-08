/* Este es el genera, que dibuja la arquitectura o dibuja el detalle de switches, routers o firewall */

import React, { useState, useEffect, useContext } from 'react';
import NodeCore from './nodeCoreDevice';
import { Link } from 'react-router-dom'
import networkContext from "../../context/network/networkContext";

//import architecture from './architectureDevices'
import architecture from './architecturedevices'
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
} from 'react-flow-renderer';
import Header from '../../layout/header';


const Diagram_Devices = () => {

  const tContext = useContext(networkContext)
  const { getArchitectureDevices, architectureDevices } = tContext
  const [elements, setElements] = useState(architecture);

  const networkNodeName = localStorage.getItem('networkNodeName');

  useEffect(() => {

    console.log(architectureDevices)
    if (architectureDevices.length !== 0) { //si el array no esta vacío, carga devices
      setElements(architecture(architectureDevices))
    }
  }, [architectureDevices])

  useEffect(() => {
    if (networkNodeName !== "") {
      getArchitectureDevices(networkNodeName)
      localStorage.setItem('networkNodeName', '')
    }
    else {
      return <h2>Seleccione un nodo de red</h2>
    }
    // eslint-disable-next-line
  }, [networkNodeName])



  const nodeTypes = {
    Botones: NodeCore,
  };

  const onLoad = (reactFlowInstance) => {
    //reactFlowInstance.fitView();
    // reactFlowInstance.setCenter(0,0)
  };

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onNodeDragStop = (event, node) => console.log('drag stop', node);
  const onElementClick = (event, element) => console.log('click', element);
  const back = () => {
    window.open("/architecture", "_self")
  }

  return (

    <div>
      <Header />
      <h1>Conexiones del switch {(networkNodeName)}</h1>
      <div className='contenedor_networkDevices'>
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
            defaultZoom={1.0}
            snapToGrid={true}
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

export default Diagram_Devices;