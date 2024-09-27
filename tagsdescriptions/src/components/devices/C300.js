import React, { Fragment } from 'react';

const C300 = ({deviceSelected}) => {
    //console.log(deviceSelected)
    //console.log(deviceSelected.status_)
    
    const renderSwitch = (param) => {
        console.log(param)
        switch(param) {
            case 0: return <img alt="icon_green" src = "/img/icon_green.svg.png" className="img_status_interface"/>
            case 1: return <img alt="icon_yellow" src = "/img/icon_yellow.svg.png" className="img_status_interface"/>
            case 2: return <img alt="icon_red" src = "/img/icon_red.svg.png" className="img_status_interface"/>
            case 3: return <img alt="icon_grey" src = "/img/icon_grey.svg.png" className="img_status_interface"/>
            default: return <img alt="icon_grey" src = "/img/icon_grey.svg.png" className="img_status_interface"/>
        }
    }

    return (
        <div className="device_grid">
                {deviceSelected.type_desc?
                    <img className="device_img" src={deviceSelected.type_desc.url} alt={deviceSelected.type_desc.url}/>
                : console.log("deviceSelected es null")
                }
                {deviceSelected.status_.c300 ? 
                    (
                    <Fragment>
                        <div className="device_div" >
                            <table className="device_table">
                                <tbody className="device_table">
                                    <tr>
                                        <th width="50%">Properties</th>
                                        <th width="50%"></th>
                                    </tr>
                                    {deviceSelected.status_.c300.state.map(datos=>{ //aca se usa map y despues un return, en javascript: foreach
                                        return(<tr>
                                            <td width="50%"><b>{datos.label}</b></td>
                                            {datos.type === "icon" ?
                                                (datos.value === 0 ? 
                                                    <img alt="icon_green" src = "/img/icon_green.svg.png" className="img_status_interface"/>
                                                    : (<img alt="icon_red" src = "/img/icon_red.svg.png" className="img_status_interface"/>))
                                            :
                                                null
                                            }
                                            {(datos.type === "icon4") ?
                                                renderSwitch(datos.value)
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
                        <div className="device_div">
                            <table className="device_table">
                                <tbody className="device_table">
                                    <tr>
                                        <th width="50%">Soft Failure</th>
                                        <th width="50%"></th>
                                    </tr>
                                    {
                                        deviceSelected.status_.c300.softfailure.map( failure => {
                                            return (<tr>
                                                <td width="50%"><b>{failure.label}</b></td>
                                                {failure.type === "icon" ?
                                                    (failure.value === 0 ? 
                                                        <img alt="icon_green" src = "/img/icon_green.svg.png" className="img_status_interface"/>
                                                        : (<img alt="icon_red" src = "/img/icon_red.svg.png" className="img_status_interface"/>))
                                                :
                                                    null 
                                                }
                                                {(failure.type === "icon4") ?
                                                    renderSwitch(failure.value)
                                                :
                                                    null
                                                }
                                                {(failure.type === "value") ?
                                                    <td width="50%" key="nombre"><b>{failure.value}</b></td>
                                                :
                                                    null
                                                }
                                            </tr>)
                                        })
                                    }
                                    
                                </tbody>        
                            </table>
                        </div>
                    </Fragment>
                )       
                :console.log(deviceSelected.status_.c300)}
            </div>
    );
};

export default C300; 