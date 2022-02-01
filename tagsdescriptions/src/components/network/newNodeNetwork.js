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
    const {networkNodeSelected, showForm, createNetworkNode, updateNetworkNode, networkmodels, areas,  getNetworkModels, getAreas, message, resetMessage} = nContext

    const aContext = useContext(alertContext)
    const {alert, showAlert} = aContext


    const [nodeName, setNodeName] = useState('')
    const [nodeDescription, setNodeDescription] = useState('')
    const [nodeModel, setNodeModel] = useState('')
    const [area, setArea] = useState('')
    const [nodeIP, setNodeIP] = useState('')

    useEffect(() => { /*tuve que meterlo en un useeffect porque en una funcion entraba dos veces*/
        //console.log(networkNodeSelected)
        getNetworkModels()
        getAreas()
        if (networkNodeSelected !== null && networkNodeSelected.length>0){
            //console.log(networkNodeSelected)
            const [currentnetworkNode] = networkNodeSelected
            setNodeName(currentnetworkNode.nodeName)
            setNodeDescription(currentnetworkNode.nodeDescription)
            setNodeModel(currentnetworkNode.nodeModel)
            setArea(currentnetworkNode.area)
            setNodeIP(currentnetworkNode.nodeIP)
        }else{
            setNodeName('')
            setNodeDescription('')
            setNodeModel('')
            setArea('')
            setNodeIP('')
        }
        // eslint-disable-next-line
    }, [networkNodeSelected])

    // useEffect(() => {
    //     console.log(networkmodelos)
    // }, [networkmodelos])

    useEffect(() => { //para los errores
        if(message){
            showAlert(message.msg, message.category)
            resetMessage()
        }
    }, [message])
    
    const [icon, seticon] = useState('')
      
 
    
    if (!asset) return null

    const onChangeNodeName = (e)=>{
        setNodeName(e.target.value)
    }
    const onChangeNodeDescription = (e)=>{
        setNodeDescription(e.target.value)
    }
    /*const onChangeNodeModel = (e)=>{
        setNodeModel(e.target.value)
    }*/
    const onChangeNodeIP = (e)=>{
        setNodeIP(e.target.value)
    }


    const onClickCancelar = (e) =>{
        showForm();
    }
    
    const onSubmitNodeNetwork = (e)=>{

        e.preventDefault();

        if(nodeModel==="")
            {showAlert("Se debe ingresar un modelo válido", "alerta-error")
            return
            }
        const newNetworkNode = {}
        newNetworkNode.nodeName = nodeName;
        newNetworkNode.nodeDescription = nodeDescription;
        newNetworkNode.nodeModel = nodeModel;
        newNetworkNode.area = area;
        newNetworkNode.nodeIP = nodeIP;
        newNetworkNode.asset = asset[0]._id;
        //console.log(newNetworkNode)
        if(networkNodeSelected===null) /*Nuevo*/
            createNetworkNode(newNetworkNode)
        else{ /*update*/ 
            //console.log("Entro Update");
            newNetworkNode._id=networkNodeSelected[0]._id; /* le agrego el ID porque es existente */
            updateNetworkNode(newNetworkNode)
        }
        //}
    }

       
    return ( 
        <Fragment>
            {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null}
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
                             <select className={`input-text${icon}`}
                                onChange={e => setNodeModel(e.target.value)}
                                value={nodeModel} //esto es para que se mantenga seleccionado lo que elegi en el combo, sino vuelve al que estaba antes
                             >
                                <option key="asdasd" value="">Seleccione un modelo</option>
                                {//cargo todos los modelos:
                                networkmodels ?
                                    networkmodels.map(networkmodel=>( //al ser un array puedo utilizar map, que siempre requiere de un key
                                    <option key={networkmodel._id} value={networkmodel._id}>{networkmodel.model}</option>
                                ))
                                : null
                                }
                             </select>
                             
                             
                             <select className={`input-text${icon}`}
                                onChange={e => setArea(e.target.value)}
                                value={area} //esto es para que se mantenga seleccionado lo que elegi en el combo, sino vuelve al que estaba antes
                             >
                                <option key="qwe" value="">Seleccione un area</option>
                                {//cargo todos los modelos:
                                areas ?
                                    areas.map(area=>( //al ser un array puedo utilizar map, que siempre requiere de un key
                                    <option key={area.area} value={area.area}>{area.description}</option>
                                ))
                                : null
                                }
                             </select>


                             <input  
                                type="text"
                                className={`input-text${icon}`}
                                placeholder="IP Address"
                                name="nodeIP"
                                value ={nodeIP}
                                onChange = {onChangeNodeIP}
                            />
                            {networkNodeSelected===null ?  
                                (<input 
                                type="button"
                                className="btn btn-primario btn-block"
                                onClick = {onSubmitNodeNetwork}
                                value = "Agregar Nodo"
                                />
                                )
                                :
                                (<input 
                                    type="button"
                                    className="btn btn-primario btn-block"
                                    onClick = {onSubmitNodeNetwork}
                                    value = "Guadrdar Nodo"
                                    />
                                )
                            }
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