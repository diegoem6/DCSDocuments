import React, {Fragment, useContext, useEffect, useState} from 'react';
import networkContext from "../../context/network/networkContext";

const NetworkStatus = () => {

    const networkstatusID=localStorage.getItem('networkstatusID');
    const tContext = useContext(networkContext)
    const {getNetworkNode, networkNodeSelected, getNetworkModel, networkmodelo} = tContext
    //let {nodeName, nodeDescription, nodeModel, nodeIP}="sss"
    const [nodeName, setnodeName]=useState("")
    const [nodeDescription, setnodeDescription]=useState("")
    const [nodeModel, setnodeModel]=useState("")
    const [nodeIP, setnodeIP]=useState("")

    

    useEffect(() => {
            if (networkstatusID){
                getNetworkNode(networkstatusID)
                //console.log("El nodo seleccionado es: ",networkNodeSelected) //aca me quede no se por que no trae nada networkNodeSelected, pero si tiene...
                }
            else{
                return <h2>Seleccione un nodo de red</h2>
            }
        // eslint-disable-next-line
    }, [networkstatusID])

    useEffect(() => {
        if(networkNodeSelected){
            setnodeName(networkNodeSelected.nodeName)
            setnodeDescription(networkNodeSelected.nodeDescription)
            //setnodeModel(getNetworkModel(networkNodeSelected.nodeModel).model)
            getNetworkModel(networkNodeSelected.nodeModel) /* pido el networkmodelo */
            setnodeIP(networkNodeSelected.nodeIP)
        }
    }, [networkNodeSelected])

    useEffect(() => {
        if(networkmodelo){
            setnodeModel(networkmodelo.model)
            console.log('El modelo es: ',networkmodelo.model)
            console.log(networkmodelo.url)
        }
    }, [networkmodelo])


    return ( 
        <Fragment>
            <h1>{nodeName}</h1>
            <h1>{nodeDescription}</h1>
            <h1>{nodeModel}</h1>
            <h1>{nodeIP}</h1>
            {networkmodelo?
                <img class="status_modelo_imagen" src={networkmodelo.url} alt={networkmodelo.url}/>
            : null
            }
            <h2>Tabla de eventos {alarmasyeventos[0][0].Tagname}</h2>
                <table>
                <tr>
                    <th>Interface</th>
                    <th>Descripcion</th>
                    <th>Estado</th>
                    <th>Vlan</th>
                    <th>Speed</th>
                    <th>Duplex</th>
                    <th>Type</th>
                </tr>
                {pag.data.slice(pag.offset,pag.offset+pag.perPage).map(alarma =>(
                    <tr>
                    <td key={alarma.Fecha}>{alarma.AreaName}</td>
                    <td>{alarma.Tagname}</td>
                    <td>{(alarma.Block)!=null ? (alarma.Block) : '-----'  }</td>
                    <td>{(alarma.AlarmLimit)!=null ? (alarma.AlarmLimit) : '-----'  }</td>
                    <td>{(alarma.ConditionName)!=null ? (alarma.ConditionName) : '-----'  }</td>
                    <td>{(alarma.Description)!=null ? (alarma.Description) : '-----'  }</td>
                    <td>{(alarma.Action)!=null ? (alarma.Action) : '-----'  }</td>
                    <td>{(alarma.Priority)!=null ? (alarma.Priority) : '-----'  }</td>
                    <td>{(alarma.Actor)!=null ? (alarma.Actor) : '-----'  }</td>
                    <td>{(alarma.Value)!=null ? (alarma.Value) : '-----'  }</td>
                    <td>{alarma.Fecha}</td>
                    </tr>
                ))}
            </table>

        </Fragment>
        

     );
}
 
export default NetworkStatus;