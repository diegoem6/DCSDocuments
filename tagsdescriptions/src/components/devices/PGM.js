import React, {Fragment} from 'react';

const PGM = ({deviceSelected}) => {
    //{deviceSelected.status.pgm[2].state.bcmstate}
    return (
        <Fragment>
        <div className="device_grid">
                {deviceSelected.type_desc?
                    <img className="device_img" src={deviceSelected.type_desc.url} alt={deviceSelected.type_desc.url}/>
                : null
                }
                {deviceSelected.status.pgm ? 
                    <div className="device_div">
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="50%">Properties</th>
                                    <th width="50%"></th>
                                </tr>
                                <tr>
                                    <td width="50%"><b>Estado</b></td>
                                    <td width="50%" key="state">
                                        {deviceSelected.status.pgm[2].state.bcmstate}
                                    </td> 
                                </tr>
                                <tr>
                                    <td width="50%"><b>CPU Free (%)</b></td>
                                    <td width="50%" key="cpu">
                                        {deviceSelected.status.pgm[2].state.cpufreeavg}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>Memory Free (Kb)</b></td>
                                    <td width="50%" key="memory">
                                        {deviceSelected.status.pgm[2].state.freememink}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>Temp (°C)</b></td>
                                    <td width="50%" key="temp"> 
                                        {deviceSelected.status.pgm[2].state.ctemp}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>Redundancy</b></td>
                                    <td width="50%" key="redundancy">
                                        {deviceSelected.status.pgm[2].state.modisredun}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>PDA packet sent avg</b></td>
                                    <td width="50%" key="pdapacketsent">
                                        {deviceSelected.status.pgm[2].state.pktstxavg}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>PDA packet received avg</b></td>
                                    <td width="50%" key="pdapacketreceived">
                                        {deviceSelected.status.pgm[2].state.pktsrxavg}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>PDC message avg</b></td>
                                    <td width="50%" key="pdcemssageavg">
                                        {deviceSelected.status.pgm[2].state.pdcmsgavg}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>CDA Avg display params/sec</b></td>
                                    <td width="50%" key="nombre">
                                        {deviceSelected.status.pgm[2].state.cda_averagedisplayparams}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> 
                : null }
                {deviceSelected.status.pgm ?
                    <div className="device_div">
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="50%">Soft Failure</th>
                                    <th width="50%"></th>
                                </tr>
                                {
                                    deviceSelected.status.pgm[2].state.softfailure.map(
                                        (failure) => {
                                            return (<tr>
                                                <td width="50%"><b>{failure.label}</b></td>
                                                <td width="50%" key="nombre">
                                                    {failure.value === "on" ? 
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
                {deviceSelected.status.pgm ? 
                    <div className="device_div">
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="50%"><b>PBLink 1</b></th>
                                    <th width="50%">
                                        
                                    </th>
                                    
                                </tr>
                                <tr>
                                    <td width="50%"><b>State</b></td>
                                    <td width="50%" key="namepblink">
                                       {deviceSelected.status.pgm[0].PBLINK1 ? 
                                                (deviceSelected.status.pgm[0].PBLINK1.properties.state === "ONLINE" ?
                                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>:
                                                <img src = "/img/icon_red.svg.png" className="img_status_interface"/>) 
                                                : null}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>Name</b></td>
                                    <td width="50%" key="namepblink">
                                        {deviceSelected.status.pgm[0].PBLINK1.properties.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>Link number</b></td>
                                    <td width="50%" key="linknumber">
                                        {deviceSelected.status.pgm[0].PBLINK1.properties.linknum}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>Field network type</b></td>
                                    <td width="50%" key="fieldnetworktype"> 
                                        {deviceSelected.status.pgm[0].PBLINK1.properties.fielnetwrktype}
                                    </td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                        <br/><br/><br/>
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="34%">DSB Name</th>
                                    <th width="16%" key="nombre">Slave</th>
                                    <th width="34%" key="nombre">Slave type</th>
                                    <th width="16%" key="nombre">State</th>
                                </tr>
                                {
                                deviceSelected.status.pgm[0].PBLINK1.slaves.map(
                                        (slave) => {
                                            return (<tr>
                                                <td width="34%">{slave.DSB_Name}</td>
                                                <td width="16%" key="nombre">
                                                    {slave.Slave_Num}
                                                    
                                                </td>
                                                <td width="34%" key="nombre">
                                                    {slave.Slave_Tipo}
                                                </td>
                                                <td width="16%" key="nombre">
                                                    {slave.State === "on" ?
                                                    <img src = "/img/icon_green.svg.png" className="img_status_interface"/>:
                                                    <img src = "/img/icon_red.svg.png" className="img_status_interface"/>}
                                                </td>
                                            </tr>)
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                    </div> 
                : null }
                {deviceSelected.status.pgm ? 
                    <div className="device_div">
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="50%"><b>PBLink 2</b></th>
                                    <th width="50%">
                                    </th>
                                    
                                </tr>
                                <tr>
                                    <td width="50%"><b>State</b></td>
                                    <td width="50%" key="namepblink">
                                       {deviceSelected.status.pgm[1].PBLINK2 ? 
                                                (deviceSelected.status.pgm[1].PBLINK2.properties.state === "ONLINE" ?
                                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>:
                                                <img src = "/img/icon_red.svg.png" className="img_status_interface"/>) 
                                                : null}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>Name</b></td>
                                    <td width="50%" key="namepblink">
                                        {deviceSelected.status.pgm[1].PBLINK2.properties.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>Link number</b></td>
                                    <td width="50%" key="linknumber">
                                        {deviceSelected.status.pgm[1].PBLINK2.properties.linknum}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><b>Field network type</b></td>
                                    <td width="50%" key="fieldnetworktype"> 
                                        {deviceSelected.status.pgm[1].PBLINK2.properties.fielnetwrktype}
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <br/><br/><br/>
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="34%">DSB Name</th>
                                    <th width="16%" key="nombre">Slave</th>
                                    <th width="34%" key="nombre">Slave type</th>
                                    <th width="34%" key="nombre">State</th>
                                </tr>
                                {
                                deviceSelected.status.pgm[1].PBLINK2.slaves.map(
                                        (slave) => {
                                            return (<tr>
                                                <td width="34%">{slave.DSB_Name}</td>
                                                <td width="16%" key="nombre">
                                                    {slave.Slave_Num}
                                                    
                                                </td>
                                                <td width="50%" key="nombre">
                                                    {slave.Slave_Tipo}
                                                </td>
                                                <td width="50%" key="nombre">
                                                    {slave.State === "on" ?
                                                    <img src = "/img/icon_green.svg.png" className="img_status_interface"/>:
                                                    <img src = "/img/icon_red.svg.png" className="img_status_interface"/>}
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