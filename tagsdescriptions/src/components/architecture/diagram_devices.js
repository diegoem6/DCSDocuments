/* Este es el genera, que dibuja la arquitectura o dibuja el detalle de switches, routers o firewall */

import React, { useState, useEffect, useContext } from 'react';
import NodeCore from './nodeCoreDevice';
import { Link } from 'react-router-dom'
import networkContext from "../../context/network/networkContext";
import deviceContext from '../../context/devices/devicesContext'


//import architecture from './architectureDevices'
import architecture from './architecturedevices'
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Header from '../../layout/header';


const Diagram_Devices = () => {

  const tContext = useContext(networkContext)
  const { getArchitectureDevices, architectureDevices } = tContext
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  const dContext = useContext(deviceContext)
  const {deselectDeviceId} = dContext //getNetworkNode 

  const networkNodeName = localStorage.getItem('networkNodeName');

  useEffect(() => {
    if (architectureDevices.length !== 0) {
      const elements = architecture(architectureDevices);
      const nodes = elements.filter(el => el.type === 'Botones');
      const edges = elements.filter(el => el.type === 'smoothstep');
      setNodes(nodes);
      setEdges(edges);
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

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const onNodeDragStop = (event, node) => console.log('drag stop', node);
  const onElementClick = (event, element) => {
    
    if ((element.data.idMongo  !== localStorage.getItem('devicestatusID')) && element.data.idMongo){ //si no agrego la comparacion con lo que habia antes, entra 24 veces! que onda el useEffect, hace lo que quiere...
     if(event.target.id==="btnConnections"){
        console.log("CLICKK")
        window.open("/conections300/"+ element.data.idMongo, "_blank")
     }else{
        localStorage.setItem('devicestatusID',element.data.idMongo)
        window.open('/devicestatus', "_blank")
        deselectDeviceId()
    }
    }
  }
  const back = () => {
    window.open("/architecture", "_self")
  }

  return (

    <div>
      <Header />
      <h1>Conexiones del switch {(networkNodeName)}</h1>
      <div className='contenedor_networkDevices'>
        {(nodes.length > 0) ? //si tengo algo en nodes, muestro el diagrama
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
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