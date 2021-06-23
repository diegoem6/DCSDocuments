import React,{Fragment, useState, useContext, useEffect} from 'react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import alertContext from '../../context/alerts/alertContext';
import networkContext from '../../context/network/networkContext';
import assetContext from '../../context/asset/assetContext';
//import Files from 'react-files'

const NewNodeNetwork = () => {
    
    
    const asContext = useContext(assetContext)
    const {asset} = asContext

    const nContext = useContext(networkContext)
    const {showForm, createNetworkNode} = nContext

    const aContext = useContext(alertContext)
    const {showAlert} = aContext


    const [nodeName, setNodeName] = useState('')
    const [nodeDescription, setNodeDescription] = useState('')
    const [nodeModel, setNodeModel] = useState('')
    const [nodeIP, setNodeIP] = useState('')
    // TODO: attachments
    // const [attachments, setattachments] = useState({
    //     files:[]
    // })
    
    const [icon, seticon] = useState('')
      
 
    
    if (!asset) return null


    const onChangeNodeName = (e)=>{
        setNodeName(e.target.value)
    }
    const onChangeNodeDescription = (e)=>{
        setNodeDescription(e.target.value)
    }
    const onChangeNodeModel = (e)=>{
        setNodeModel(e.target.value)
    }
    const onChangeNodeIP = (e)=>{
        setNodeIP(e.target.value)
    }


    const onClickCancelar = (e) =>{
        showForm();
    }
    
    const onSubmitNodeNetwork = (e)=>{

        e.preventDefault();
        const newNetworkNode = {}
        newNetworkNode.nodeName = nodeName;
        newNetworkNode.nodeDescription = nodeDescription;
        newNetworkNode.nodeModel = nodeModel;
        newNetworkNode.nodeIP = nodeIP;
        newNetworkNode.asset = asset[0]._id;
        console.log(newNetworkNode)
        // if (networkNode !== null && networkNode.length>0){
        //     const [currentNetworkNode] = networkNode
        //     newNetworkNode._id = currentNetworkNode._id
        //     updateNetworkNode(newNetworkNode)  
        // }else{
         
            createNetworkNode(newNetworkNode)

        //}
    }

   
    
    return ( 
        <Fragment>
                <h2>Node en el asset: {asset[0].name}</h2>
                <div className="formNode">
                    <div className="node">
                        <form   
                            className="formulario-nuevo-proyecto"
                            onSubmit = {onSubmitNodeNetwork}
                            >
                            <input  
                                type="text"
                                className={`input-text${icon}`}
                                placeholder="Node name"
                                name="nodeName"
                                value ={nodeName}
                                onChange = {onChangeNodeName}
                            />
                             <input  
                                type="text"
                                className={`input-text${icon}`}
                                placeholder="Description"
                                name="nodeDescription"
                                value ={nodeDescription}
                                onChange = {onChangeNodeDescription}
                            />
                             <input  
                                type="text"
                                className={`input-text${icon}`}
                                placeholder="Model"
                                name="nodeModel"
                                value ={nodeModel}
                                onChange = {onChangeNodeModel}
                            />
                             <input  
                                type="text"
                                className={`input-text${icon}`}
                                placeholder="IP"
                                name="nodeIP"
                                value ={nodeIP}
                                onChange = {onChangeNodeIP}
                            />
                            <input 
                                type="button"
                                className="btn btn-primario btn-block"
                                onClick = {onSubmitNodeNetwork}
                                value = "Agregar Nodo"
                            />
                            <input 
                                type="button"
                                className="btn btn-primario btn-block"
                                onClick = {onClickCancelar}
                                value = "Cancelar"
                            />
                            {/* {(tagdescriptor !== null && tagdescriptor.length>0) ?
                        
                                (<input 
                                    type="submit"
                                    className="btn btn-primario btn-block"
                                    value = "Guardar Tag"
                                /> )
                                :
                                (<input 
                                    type="submit"
                                    className="btn btn-primario btn-block"
                                    value = "Agregar Tag"
                                /> )
                            } */}
                            
                        </form>
                    </div>
                    
                </div>
                
        </Fragment>
     );
}
 
export default NewNodeNetwork;