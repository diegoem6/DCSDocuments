/* Este es el genera, que dibuja la arquitectura o dibuja el detalle de switches, routers o firewall */

import React, { useState, useEffect, useContext } from 'react';
import NodeCore from './nodeCoreNetwork';
import { Link } from 'react-router-dom'
import networkContext from "../../context/network/networkContext";

import architecture from './architectureNetworking'

import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Header from '../../layout/header';

const Diagram_Networking = () => {
  const tContext = useContext(networkContext)
  const {getArchitectureNetworkNodes, architectureNetworkNodes} = tContext
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
 
  useEffect(() => {
    getArchitectureNetworkNodes()
  }, [])

  useEffect(() => {
    if(architectureNetworkNodes.nodes) {
      const elements = architecture(architectureNetworkNodes);
      const nodes = elements.filter(el => el.type === 'Botones');
      const edges = elements.filter(el => el.type === 'smoothstep');
      setNodes(nodes);
      setEdges(edges);
    }
  }, [architectureNetworkNodes])
  
  const nodeTypes = {
    Botones: NodeCore,
  };

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
  
  const onNodeDragStop = (event, node) => console.log('drag stop', node);
  const onElementClick = (event, element) => console.log('click', element);
  
  const back = () => {
    window.open("/architecture", "_self")
  }
  
  return (
    <div>
      <Header />
      <h1>Arquitectura de red</h1>  
      <div className='contenedor'>
        {(nodes.length > 0) ? 
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onLoad={onLoad}
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