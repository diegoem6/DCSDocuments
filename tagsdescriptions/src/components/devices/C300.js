import React from 'react';

const C300 = ({deviceSelected}) => {
    return (
        <div className="device_grid">
                {deviceSelected.type_desc?
                    <img className="device_img" src={deviceSelected.type_desc.url} alt={deviceSelected.type_desc.url}/>
                : console.log("deviceSelected es null")
                }
                <div className="device_div">
                    <table className="device_table">
                        <tbody className="device_table">
                            <tr>
                                <th width="50%">Properties</th>
                                <th width="50%"></th>
                            </tr>
                            <tr>
                                <td width="50%"><b>{deviceSelected.status.c300.state[0].label}</b></td>
                                <td width="50%" key="nombre">{deviceSelected.status.c300.state[0].value}</td>
                            </tr>
                   
                            <tr>
                                <td width="50%"><b>{deviceSelected.status.c300.state[1].label} &nbsp; &nbsp; &nbsp;
                                {deviceSelected.status.c300.state[1].value === 0 ? 
                                    (<img src = "/img/icon_green.svg.png" className="img_status_interface"/>)
                                    :
                                    (<img src = "/img/icon_red.svg.png" className="img_status_interface"/>)
                                }
                                </b></td>
                                <td width="50%"><b>{deviceSelected.status.c300.state[2].label} &nbsp; &nbsp; &nbsp;
                                {deviceSelected.status.c300.state[2].value === 0 ? 
                                    (<img src = "/img/icon_green.svg.png" className="img_status_interface"/>)
                                    :
                                    (<img src = "/img/icon_red.svg.png" className="img_status_interface"/>)
                                }
                                </b></td>
                                
                            </tr>
                            <tr>
                                <td width="50%"><b>{deviceSelected.status.c300.state[3].label}</b></td>
                                <td width="50%" key="nombre">{deviceSelected.status.c300.state[3].value}</td>
                            </tr>
                            <tr>
                                <td width="50%"><b>{deviceSelected.status.c300.state[4].label}</b></td>
                                <td width="50%" key="nombre">{deviceSelected.status.c300.state[4].value}</td>
                            </tr>
                            <tr>
                                <td width="50%"><b>{deviceSelected.status.c300.state[5].label}</b></td>
                                <td width="50%" key="nombre">{deviceSelected.status.c300.state[5].value}</td>
                            </tr>
                            <tr>
                                <td width="50%"><b>{deviceSelected.status.c300.state[6].label}</b></td>
                                <td width="50%" key="nombre">
                                {deviceSelected.status.c300.state[6].value === 0 ? 
                                    (<img src = "/img/icon_green.svg.png" className="img_status_interface"/>)
                                    :
                                    (<img src = "/img/icon_red.svg.png" className="img_status_interface"/>)
                                }    
                                </td>
                            </tr>
                            <tr>
                                <td width="50%"><b>{deviceSelected.status.c300.state[7].label}</b></td>
                                <td width="50%" key="nombre">
                                {deviceSelected.status.c300.state[7].value === 0 ? 
                                    (<img src = "/img/icon_green.svg.png" className="img_status_interface"/>)
                                    :
                                    (<img src = "/img/icon_red.svg.png" className="img_status_interface"/>)
                                }     
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>   
                <div className="device_div">
                    <table className="device_table">
                        <tbody className="device_table">
                            <tr>
                                <th width="50%">Soft Failure</th>
                                <th width="50%"></th>
                            </tr>
                            {
                                deviceSelected.status.c300.softfailure.map( failure => {
                                    return (<tr>
                                        <td width="50%"><b>{failure.label}</b></td>
                                        <td width="50%">{failure.value === 0 ? 
                                            (<img src = "/img/icon_green.svg.png" className="img_status_interface"/>)
                                            :
                                            (<img src = "/img/icon_red.svg.png" className="img_status_interface"/>)
                                        }
                                        </td>
                                    </tr>)
                                })
                            }
                            
                        </tbody>        
                    </table>
                </div>    
            </div>
    );
};

export default C300;