import React, {Fragment, useContext, useEffect, useState} from 'react';
import networkContext from "../../context/network/networkContext";
import imagenes from './img/imgenes';

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

    const getImageModel =()=> {
        switch (networkmodelo.model){
            case "Cisco 2960":
                return(imagenes.cisco_2960)
            case "Cisco 3750":
                return(imagenes.cisco_3750)
                case "Cisco 3850":
                    return(imagenes.cisco_3850)
        }

    }
    return ( 
        <Fragment>
            <h1>{nodeName}</h1>
            <h1>{nodeDescription}</h1>
            <h1>{nodeModel}</h1>
            <h1>{nodeIP}</h1>
            {networkmodelo?
                <img class="status_modelo_imagen" src={getImageModel()} alt={networkmodelo.model}/>
                //<img src={imagenes.cisco_2960} alt={networkmodelo.model}/>
                //<img src="img/cisco_2960.PNG" alt="imagen2"/> 
            : null
            }
        </Fragment>
        

     );
}
 
export default NetworkStatus;