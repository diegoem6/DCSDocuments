import React, {useContext, useEffect, useState} from 'react';
import networkContext from "../../context/network/networkContext";

const NetworkStatus = () => {

    const networkstatusID=localStorage.getItem('networkstatusID');
    const tContext = useContext(networkContext)
    const {getNetworkNode, networkNodeSelected} = tContext
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
            setnodeModel(networkNodeSelected.nodeModel)
            setnodeIP(networkNodeSelected.nodeIP)
            console.log("Entro")
        }

    }, [networkNodeSelected])

    return ( 
        <h1>{nodeName}</h1>
        

     );
}
 
export default NetworkStatus;