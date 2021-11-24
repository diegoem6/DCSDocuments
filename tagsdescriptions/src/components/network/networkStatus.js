import React, {Fragment, useContext, useEffect, useState} from 'react';
import networkContext from "../../context/network/networkContext";
import ReactPaginate from 'react-paginate';

const NetworkStatus = () => {

    const networkstatusID=localStorage.getItem('networkstatusID');
    const tContext = useContext(networkContext)
    const {getNetworkNode, networkNodeSelected, getNetworkModel, networkmodelo, urlDoc, createNetworkNodeShowRun} = tContext
    //let {nodeName, nodeDescription, nodeModel, nodeIP}="sss"
    const [nodeName, setnodeName]=useState("")
    const [nodeDescription, setnodeDescription]=useState("")
    const [nodeModel, setnodeModel]=useState("")
    const [nodeIP, setnodeIP]=useState("")

    const [pag, setPag] = useState(
        {
            offset:0,
            perPage:12,
            currentPage:0,
            pageCount:0,
            data:[]
        })
    
    useEffect(() => {
        if(urlDoc){
            //console.log(urlDoc)
            window.open(`../../../files/${urlDoc}`,'_blank') //poner la ruta
        }    
    }, [urlDoc])

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
            setPag(
                 {...pag,
                     pageCount: Math.ceil(networkNodeSelected.status.length/pag.perPage),
                     data:networkNodeSelected.status,
                     offset:0,
                     currentPage:0
                 })
        }
    }, [networkNodeSelected])



    useEffect(() => {
        if(networkmodelo){
            setnodeModel(networkmodelo.model)
            console.log('El modelo es: ',networkmodelo.model)
            console.log(networkmodelo.url)
        }
    }, [networkmodelo])
    
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * pag.perPage;
        setPag(
            {...pag,
                currentPage: selectedPage,
                offset:offset
            })

    };

    const onClickCreateShowRun = async (tipo)=>{
        if(networkNodeSelected)
            createNetworkNodeShowRun(networkNodeSelected.nodeIP, tipo)
            
        
    }

    return ( 
        <Fragment>
            <div className = "divHeaderNetwork">
                <h1>{nodeName}</h1>
                <h2>{nodeDescription} : {nodeIP} - {networkmodelo ? <Fragment>{networkmodelo.model}</Fragment>: null
                }</h2>
                
            </div>
            {networkmodelo?
                    
                    <img class="status_modelo_imagen" src={networkmodelo.url} alt={networkmodelo.url}/>
                : null
                }
                <div className = "download">
                    <p>show run <a onClick={()=>onClickCreateShowRun("RUN")} target="_blank"><img className="download_icon" src="/img/download.png"/></a></p>
                    <p>show tech <a onClick={()=>onClickCreateShowRun("TECH")} target="_blank"><img className="download_icon" src="/img/download.png"/></a></p>
                </div>
                
                <h2></h2>
            
                <table>
                    <tr>
                        <th width="15%">Interface</th>
                        <th width="55%">Descripcion</th>
                        <th width="10%">Estado</th>
                        <th width="5%" >Vlan</th>
                        <th width="5%">Speed</th>
                        <th width="10%">Duplex</th>
                    </tr>
                {pag.data.slice(pag.offset,pag.offset+pag.perPage).map(inter =>(
                    <tr>
                        <td width="15%" key={inter._id}>{inter.interface}</td>
                        <td width="55%">{inter.description}</td>
                        <td width="10%">
                            {
                                inter.state === "up" ?
                                    (<img src = "/img/icon_green.svg.png" className="img_status_interface"/>)
                                    :
                                    (<img src = "/img/icon_red.svg.png" className="img_status_interface"/>)
                            }
                        </td>
                        <td width="5%">{inter.vlan}</td>
                        <td width="5%">{inter.speed}</td>
                        <td width="10%">
                            {inter.duplex === "1"?
                                "Unknown"
                            :
                                (inter.duplex === "2"?
                                    "Half-Duplex"
                                :
                                    "Full Duplex"
                                )
                            }
                        </td>
                    </tr>
                ))}
                
            </table>
            <div className = "paginador">
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pag.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
        </Fragment>
        

     );
}
 
export default NetworkStatus;