import React, {Fragment} from 'react';

const PGM = ({deviceSelected}) => {
    //{deviceSelected.status_.pgm[2].state.bcmstate}
    
    const renderSwitch_icon3 = (param) => {
        switch(param) {
            case "NOTLOADED": return (<div><td width="10%" key="icono"><img src = "/img/icon_grey.svg.png" className="img_status_interface"/></td><td width="40%" key="nombre"><span>Not Loaded</span></td></div>)
            case "LOADED": return (<div><td width="10%" key="icono"><img src = "/img/icon_grey.svg.png" className="img_status_interface"/></td><td width="40%" key="nombre"><span>Loaded</span></td></div>)
            case "ONLINE": return (<div><td width="10%" key="icono"><img src = "/img/icon_green.svg.png" className="img_status_interface"/></td><td width="40%" key="nombre"><span>On Line</span></td></div>)
            default: return (<div><td width="10%" key="icono"><img src = "/img/icon_grey.svg.png" className="img_status_interface"/></td><td width="40%" key="nombre"><span>Error OPC</span></td></div>)
        }
    }
    const renderSwitch_icon4 = (param) => {
        switch(param) {
            case 0: return (<img src = "/img/icon_grey.svg.png" className="img_status_interface"/>)
            case 1: return (<img src = "/img/icon_red.svg.png" className="img_status_interface"/>)
            case 2: return (<img src = "/img/icon_green.svg.png" className="img_status_interface"/>)
            case 3: return (<img src = "/img/icon_yellow.svg.png" className="img_status_interface"/>)
            default: return (<img src = "/img/icon_grey.svg.png" className="img_status_interface"/>)
        }
    }

    return (
        <Fragment>
        <div className="device_grid">
                {deviceSelected.type_desc?
                    <img className="device_img" src={deviceSelected.type_desc.url} alt={deviceSelected.type_desc.url}/>
                : null
                }
                {deviceSelected.status_.pgm ? 
                    <div className="device_div">
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="50%">Properties</th>
                                    <th width="50%"></th>
                                </tr>
                                {deviceSelected.status_.pgm[2].state.map(datos=>{ //aca se usa map y despues un return, en javascript: foreach
                                        return(<tr>
                                            <td width="50%"><b>{datos.label}</b></td>
                                            {datos.type === "icon" ?
                                                (datos.value === 0 ? 
                                                    <img src = "/img/icon_red.svg.png" className="img_status_interface"/>
                                                    : (<img src = "/img/icon_green.svg.png" className="img_status_interface"/>))
                                            :
                                                null
                                            }
                                            {(datos.type === "value") ?
                                                <td width="50%" key="nombre">{datos.value}</td>
                                            :
                                                null
                                            }
                                        </tr>)
                                    })}
                            </tbody>
                        </table>
                    </div> 
                : null }
                {deviceSelected.status_.pgm ?
                    <div className="device_div">
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="50%">Soft Failure</th>
                                    <th width="50%"></th>
                                </tr>
                                {
                                    deviceSelected.status_.pgm[2].softfailure.map(
                                        (failure) => {
                                            return (<tr>
                                                <td width="50%"><b>{failure.label}</b></td>
                                                <td width="50%" key="nombre">
                                                    {failure.value === 0 ? 
                                                        <img src = "/img/icon_green.svg.png" className="img_status_interface"/>:
                                                        <img src = "/img/icon_red.svg.png" className="img_status_interface"/>
                                                    }
                                                    
                                                </td>
                                            </tr>)
                                        }
                                    )
                                        
                                }
                                
                            </tbody>        
                        </table>
                    </div>    
                    : null}
            </div>
            <div className="device_grid">
                {deviceSelected.type_desc?
                    <img className="device_img" src=''/>
                : console.log("deviceSelected es null")
                }
                {deviceSelected.status_.pgm ? 
                    <div className="device_div">
                        <table className="device_table">
                        <tbody className="device_table">
                                <tr>
                                    <th width="50%"><b>PBLink 1</b></th>
                                    <th width="50%"></th>
                                </tr>
                                
                                {deviceSelected.status_.pgm[0].PBLINK1.properties.map(datos=>{ //aca se usa map y despues un return, en javascript: foreach
                                        return(<tr>
                                            <td width="50%"><b>{datos.label}</b></td>
                                            {datos.type === "icon3" ?
                                                renderSwitch_icon3(datos.value)
                                            :
                                                null
                                            }
                                            {(datos.type === "value") ?
                                                <td width="50%" key="nombre">{datos.value}</td>
                                            :
                                                null
                                            }
                                        </tr>)
                                    })}


                                
                            </tbody>
                        </table>
                        <br/><br/><br/>
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="34%">DSB Name</th>
                                    <th width="16%" key="nombre">Slave #</th>
                                    <th width="34%" key="nombre">Slave type</th>
                                    <th width="16%" key="nombre">State</th>
                                </tr>
                                {
                                deviceSelected.status_.pgm[0].PBLINK1.slaves.map(
                                        (slave) => {
                                            return (<tr>
                                                <td width="34%">{slave.DSB_Name}</td>
                                                <td width="16%" key="nombre">
                                                    {slave.slave_Num}
                                                    
                                                </td>
                                                <td width="34%" key="nombre">
                                                    {slave.slave_Tipo}
                                                </td>
                                                <td width="16%" key="nombre">
                                                    {renderSwitch_icon4(slave.state)}
                                                </td>
                                            </tr>)
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                    </div> 
                : null }
                {deviceSelected.status_.pgm ? 
                    <div className="device_div">
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="50%"><b>PBLink 2</b></th>
                                    <th width="50%">
                                    </th>
                                    
                                </tr>
                                
                                {deviceSelected.status_.pgm[1].PBLINK2.properties.map(datos=>{ //aca se usa map y despues un return, en javascript: foreach
                                        return(<tr>
                                            <td width="50%"><b>{datos.label}</b></td>
                                            {datos.type === "icon3" ?
                                                renderSwitch_icon3(datos.value)
                                            :
                                                null
                                            }
                                            {(datos.type === "value") ?
                                                <td width="50%" key="nombre">{datos.value}</td>
                                            :
                                                null
                                            }
                                        </tr>)
                                    })}
                                
                            </tbody>
                        </table>
                        <br/><br/><br/>
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="34%">DSB Name</th>
                                    <th width="16%" key="nombre">Slave #</th>
                                    <th width="34%" key="nombre">Slave type</th>
                                    <th width="16%" key="nombre">State</th>
                                </tr>
                                {
                                deviceSelected.status_.pgm[1].PBLINK2.slaves.map(
                                        (slave) => {
                                            return (<tr>
                                                <td width="34%">{slave.DSB_Name}</td>
                                                <td width="16%" key="nombre">
                                                    {slave.slave_Num}
                                                    
                                                </td>
                                                <td width="34%" key="nombre">
                                                    {slave.slave_Tipo}
                                                </td>
                                                <td width="16%" key="nombre">
                                                    {renderSwitch_icon4(slave.state)}
                                                </td>
                                            </tr>)
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                    </div> 
                : null }
            </div>
        </Fragment>
    );
};

export default PGM;