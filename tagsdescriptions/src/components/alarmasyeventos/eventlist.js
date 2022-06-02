import React, {useContext, useEffect, useState} from 'react';
import tagDescriptorContext from "../../context/tagdescriptor/tagDescriptorContext";
import ReactPaginate from 'react-paginate';

const Eventlist = () => {
    
    const tdContext = useContext(tagDescriptorContext)
    const {getAlarmayEventos, alarmasyeventos} = tdContext  
 
    const tagdescriptorID=localStorage.getItem('tagdescriptorID');

    
    const [pag, setPag] = useState(
        {
            offset:0,
            perPage:20,
            currentPage:0,
            pageCount:0,
            data:[]
        })
    
    useEffect(() => {
            if (tagdescriptorID){
                getAlarmayEventos(tagdescriptorID)
                //localStorage.removeItem('tagdescriptorID');
            }
            else{
                return <h2>Seleccione un tagname</h2>
            }
        // eslint-disable-next-line
    }, [tagdescriptorID])
    

    useEffect(() => {
        if (alarmasyeventos[0]){
            setPag(
                {...pag,
                    pageCount: Math.ceil(alarmasyeventos[0].length/pag.perPage),
                    data:alarmasyeventos[0],
                    offset:0,
                    currentPage:0
                })
            
        }
        // eslint-disable-next-line
    } , [alarmasyeventos[0]])

    if (!alarmasyeventos){
        return <p>No hay alarmas y eventos para el tagname seleccionado</p>
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * pag.perPage;
        setPag(
            {...pag,
                currentPage: selectedPage,
                offset:offset
            })
    };

    return ( 
        <>
        {(alarmasyeventos[0] != null) ?
            (
            <>
            <div className = "divHeaderAlarms">
                
                <h1>Tabla de eventos {alarmasyeventos[0][0].Tagname}</h1>
            </div>
                <table>
                <tr>
                    <th>Area</th>
                    <th>Tagname</th>
                    <th>Bloque</th>
                    <th>Limite Alarma</th>
                    <th>Condicion</th>
                    <th>Descripcion</th>
                    <th>Accion</th>
                    <th>Prioridad</th>
                    <th>Actor</th>
                    <th>Valor</th>
                    <th>Fecha</th>
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
            </>
            )
            :(<h2>No existen alarmas y eventos asociados a ese tagname</h2>)
            }
            
            <div className='paginador'>
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
            </>
    );
}

export default Eventlist;