import React, {Fragment, useState, useEffect, useContext} from 'react';
import Header from '../../layout/header'
import deviceContext from '../../context/devices/devicesContext';
import networkContext from '../../context/network/networkContext';
import Connection from './connection';
import connectionContext from '../../context/connection/connectionContext';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom'

const Connections = () => {
    

    const dContext = useContext(deviceContext)
    const {getDevicesAll, devicesSearch} = dContext

    const nContext = useContext(networkContext)
    const {getNetworkNodesAll, networkNodes} = nContext

    const cContext = useContext(connectionContext)
    const {getConnections, searchConnections, createConnection, connectionsSearch} = cContext

    const [source, setSource] = useState('')
    const [target, setTarget] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [search, setSearch ] = useState('')

    const [pag, setPag] = useState(
        {
            offset:0,
            perPage:10,
            currentPage:0,
            pageCount:0,
            data:[]
        })
    
    
    
    useEffect(() => {
        //if (connectionsSearch)
            setPag(
                {...pag,
                    pageCount: Math.ceil(connectionsSearch.length/pag.perPage),
                    data:connectionsSearch,
                    offset:0,
                    currentPage:0
                })
        // eslint-disable-next-line
    }, [connectionsSearch])

    
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * pag.perPage;
        setPag(
            {...pag,
                currentPage: selectedPage,
                offset:offset
            })

    };

    useEffect(() => {
        getDevicesAll()
        getNetworkNodesAll()
        getConnections()
        // eslint-disable-next-line
    }, [])

    let nodes = [{}];
    
    networkNodes.map(nn => {
        let m = {};
        m._id = nn._id;
        m.name = nn.nodeName;
        if (m.name !== ""){
            nodes.push(m)
        }
        return nodes;
    });

    devicesSearch.map(d => {
        let n = {};
        n._id = d._id;
        n.name = d.deviceName;
        if (n.name !== ""){
            nodes.push(n)
        }
        return nodes;
    });
    
    const searchConnection = (e) => {
        setSearch(e.target.value)
        searchConnections(e.target.value)
     }
    
     const createConnectionOnClick = (e) =>{
        
        if (source === ""){
            alert("completa bien nabo")
            return;
        }
        if (target === ""){
            alert("completa bien nabo")
            return;
        }
        if (type === ""){
            alert("completa bien nabo")
            return;
        }
        if (source === target){
            alert("completa bien nabo")
            return;
        }
        
        const connection = {}
        connection.source = source;
        connection.target = target;
        connection.description = description;
        connection.type = type;
        createConnection(connection);
        //getConnections()
        setSource("")
        setTarget("")
        setDescription("")
        setType("")
        
    }

    return ( 
        <Fragment>
            <Header/>
            
                {/* {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null} */}
                <div className="container-List">
                    
                    <div className="campo-form"> 
                        <select className={`input-text-2`}
                            onChange={e => setSource(e.target.value)}
                            value={source} //esto es para que se mantenga seleccionado lo que elegi en el combo, sino vuelve al que estaba antes
                            >
                            <option key="asdasdasa" value="">Seleccione un origen</option>
                            {//cargo todos los modelos:
                            nodes ?
                                nodes.map(n=>( //al ser un array puedo utilizar map, que siempre requiere de un key
                                <option key={n._id} value={n.name}>{n.name}</option>
                            ))
                            : null
                            }
                        </select>
                        {/* &#60;---&#62; */}
                        <select className={`input-text-2`}
                            onChange={e => setTarget(e.target.value)}
                            value={target} //esto es para que se mantenga seleccionado lo que elegi en el combo, sino vuelve al que estaba antes
                            >
                            <option key="asdasdasa" value="">Seleccione un destino</option>
                            {//cargo todos los modelos:
                            nodes ?
                                nodes.map(n=>( //al ser un array puedo utilizar map, que siempre requiere de un key
                                <option key={n._id} value={n.name}>{n.name}</option>
                            ))
                            : null
                            }
                        </select>
                    </div>
                    <div className="campo-form"> 
                        <input  
                            type="text"
                            className={`input-text-2`}
                            placeholder="Description"
                            name="description"
                            value ={description}
                            onChange = {e => setDescription(e.target.value)}
                        />
                        <select className={`input-text-2`}
                            onChange={e => setType(e.target.value)}
                            value={type} //esto es para que se mantenga seleccionado lo que elegi en el combo, sino vuelve al que estaba antes
                            >
                            <option key="asdasdasa" value="">Seleccione un tipo</option>
                            <option key="asdasdasa2" value="core">Core</option>
                            <option key="asdasdasa3" value="access">Access</option>
                        </select>
                    </div>
                    <div className="campo-form">
                            <button 
                                className="btn btn-block-1 btn-primario"
                                onClick={createConnectionOnClick}
                            >
                                Crear conexión
                            </button>
                    </div>
                    <div className="campo-form">
                        <input  
                            type="text"
                            className={`input-text-2`}
                            placeholder="Buscar conexiones"
                            name="findConnection"
                            value = {search}
                            onChange = {searchConnection}
                        />
                    </div>
                    <div className="">
                        <ul className="connection-list" >
                            {(connectionsSearch.length===0)?
                                (<li className="tarea"><p>No se encuentran conexiones</p></li>)
                            :
                                pag.data.slice(pag.offset,pag.offset+pag.perPage).map(nn =>(
                                    <Connection
                                        connection={nn}
                                    />
                                ))
                            } 
                            
                        </ul>
                        <div className='pag-menu'>
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
                            <Link 
                                to={'/menu'}
                                className="link-menu">
                            &#60;
                                Menu
                            </Link>
                        </div>
                    </div>
                </div>
        </Fragment>
     );
}
 
export default Connections;