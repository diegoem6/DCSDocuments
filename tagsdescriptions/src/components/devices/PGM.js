import React from 'react';

const PGM = ({deviceSelected}) => {
    console.log(deviceSelected)
    //{deviceSelected.status.pgm[2].state.bcmstate}
    return (
        <div className="device_grid">
                {deviceSelected.type_desc?
                    <img className="device_img" src={deviceSelected.type_desc.url} alt={deviceSelected.type_desc.url}/>
                : console.log("deviceSelected es null")
                }
                {deviceSelected.status.pgm ? 
                    <div className="device_div">
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="50%">Estado</th>
                                    <td width="50%" key="state">
                                        {deviceSelected.status.pgm[2].state.bcmstate}
                                    </td> 
                                </tr>
                            </tbody>
                        </table>
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th bgcolor= "#dddddd" width="25%">PBLink 1</th>
                                    <td bgcolor= "#dddddd" width="25%" key="PBLink1">
                                        {deviceSelected.status.pgm[0].PBLINK1 ? 
                                                (deviceSelected.status.pgm[0].PBLINK1.properties.state === "ONLINE" ?
                                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>:
                                                <img src = "/img/icon_red.svg.png" className="img_status_interface"/>) 
                                                : null}
                                    </td>
                                    <th bgcolor= "#dddddd" width="25%">PBLink 2</th>
                                    <td bgcolor= "#dddddd" width="25%" key="PBLink2">
                                        {deviceSelected.status.pgm[1].PBLINK2? 
                                                (deviceSelected.status.pgm[1].PBLINK2.properties.state === "ONLINE" ?
                                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>:
                                                <img src = "/img/icon_red.svg.png" className="img_status_interface"/>) 
                                                : null}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="device_table">
                            <tbody className="device_table">
                                <tr>
                                    <th width="50%">CPU Free (%)</th>
                                    <td width="50%" key="cpu">
                                        {deviceSelected.status.pgm[2].state.cpufreeavg}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="50%">Memory Free (Kb)</th>
                                    <td width="50%" key="memory">
                                        {deviceSelected.status.pgm[2].state.freememink}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="50%">Temp (°C)</th>
                                    <td width="50%" key="temp"> 
                                        {deviceSelected.status.pgm[2].state.ctemp}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="50%">Redundancy</th>
                                    <td width="50%" key="redundancy">
                                        {deviceSelected.status.pgm[2].state.modisredun}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="50%">PDA packet sent avg</th>
                                    <td width="50%" key="pdapacketsent">
                                        {deviceSelected.status.pgm[2].state.pktstxavg}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="50%">PDA packet received avg</th>
                                    <td width="50%" key="pdapacketreceived">
                                        {deviceSelected.status.pgm[2].state.pktsrxavg}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="50%">PDC message avg</th>
                                    <td width="50%" key="pdcemssageavg">
                                        {deviceSelected.status.pgm[2].state.pdcmsgavg}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="50%">CDA Avg display params/sec</th>
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
                                {
                                    deviceSelected.status.pgm[2].state.softfailure.map(
                                        (failure) => {
                                            return (<tr>
                                                <th width="50%">{failure.label}</th>
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
    );
};

export default PGM;