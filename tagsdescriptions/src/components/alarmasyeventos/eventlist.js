import React, {useContext} from 'react';
import tagDescriptorContext from "../../context/tagdescriptor/tagDescriptorContext";

const Eventlist = () => {
    
    const tdContext = useContext(tagDescriptorContext)
    const {getAlarmayEventos, alarmasyeventos} = tdContext  
 
    getAlarmayEventos(localStorage.getItem('tagdescriptorID')) //alarmasyeventos tiene la consulta sql de alarmasyeventos
    localStorage.removeItem('tagdescriptorID')
    //en el return:
    //<h1>{localStorage.getItem('tagdescriptorID')}</h1>
    return ( 
        <>
        <h2>Tabla de eventos</h2>
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
            {(alarmasyeventos[0] != null) ?
            (alarmasyeventos[0].map(alarma =>(
                <tr>
                    <td>{alarma.AreaName}</td>
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
            ))
            )
            :(<h2>No existen alarmas y eventos asociados a ese tagname</h2>)
            }
            </table>
            </>
    );
}

export default Eventlist;