import React, {useState, useContext, useEffect,Fragment} from 'react';
import deviceContext from '../../context/devices/devicesContext'

const DeviceStatus = () => {
    
    const devicestatusID=localStorage.getItem('devicestatusID');
    const dContext = useContext(deviceContext)
    const {getDevice, getDeviceType, networkmodelo, deviceSelected, devicetype} = dContext

    const [deviceName, setDeviceName] = useState('')
    const [deviceDescription, setDeviceDescription] = useState('')
    const [deviceTipo, setDeviceTipo] = useState('')
    const [deviceIP, setDeviceIP] = useState('')
    const [deviceURLOPC, setdeviceURLOPC] = useState('')


    useEffect(() => {
        if (devicestatusID){
            getDevice(devicestatusID)
            //console.log("El nodo seleccionado es: ",networkNodeSelected) //aca me quede no se por que no trae nada networkNodeSelected, pero si tiene...
            }
        else{
            return <h2>Seleccione un dispositivo</h2>
        }
    // eslint-disable-next-line
    }, [devicestatusID])

    useEffect(() => {
        if(deviceSelected){
            setDeviceName(deviceSelected.deviceName);
            setDeviceDescription(deviceSelected.deviceDescription);
            getDeviceType(deviceSelected.deviceType); //aca tengo el ID
            console.log(deviceSelected.deviceType)
            setDeviceIP(deviceSelected.deviceIP);
            setdeviceURLOPC(deviceSelected.deviceURLOPC);
        }
        
    }, [deviceSelected])

    useEffect(() => {
        if(devicetype){
            setDeviceTipo(devicetype.type)
        }
    }, [devicetype])


    return ( 
        <Fragment>
            <h1>{deviceTipo} : {deviceName}</h1>
            <h2>{deviceDescription}</h2>
            <h2>IP: {deviceIP}</h2>
            <div class="device_grid">
                {deviceTipo?
                    <img classname="device_img" src={devicetype.url} alt={devicetype.url}/>
                : null
                }
                <div className="device_div">
                    <table className="device_table">
                        <tr>
                            <th width="50%">Estado Controlador</th>
                            <td width="50%" key="nombre">CEE RUN</td>
                        </tr>
                    </table>
                    <table className="device_table">
                        <tr>
                            <th bgcolor= "#dddddd" width="25%">FTE A</th>
                            <td bgcolor= "#dddddd" width="25%" key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                            <th bgcolor= "#dddddd" width="25%">FTE B</th>
                            <td bgcolor= "#dddddd" width="25%" key="nombre2">
                            <img src = "/img/icon_red.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                    </table>
                    <table className="device_table">
                        <tr>
                            <th width="50%">CPU Free (%)</th>
                            <td width="50%" key="nombre">89.28</td>
                        </tr>
                        <tr>
                            <th width="50%">Temp (°C)</th>
                            <td width="50%" key="nombre">42.00</td>
                        </tr>
                        <tr>
                            <th width="50%">Redundancy</th>
                            <td width="50%" key="nombre">NONREDUND</td>
                        </tr>
                        <tr>
                            <th width="50%">FTE InterLAN comm. failed</th>
                            <td width="50%" key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th width="50%">FTE crossover cable field</th>
                            <td width="50%" key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                    </table>
                </div>   
                <div className="device_div">
                    <table className="device_table">
                        <tr>
                            <th width="50%">Battery State Warning</th>
                            <td width="50%" key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Device Index Switches Changed</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Factory Data Error</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>ROM Application Image Checksum Failure</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>ROM Boot Image Checksum Failure</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>WDT Hardware Failure</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>WDT Refresh Warning</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Critical Task Watchdog Warning</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Uncorrectable Internal RAM Sweep Error</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Corrected Internal RAM Sweep Error</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Uncorrected User RAM Sweep Error</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Corrected User RAM Sweep Error</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>IOLINK(1) Soft Fail Error</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>IOLINK(2) Soft Fail Error</th>
                            <td key="nombre">
                                <img src = "/img/icon_red.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Debug Flag Enabled</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Minimum HW Revision</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Partner Not Visible on FTE</th>
                            <td key="nombre">
                                <img src = "/img/icon_green.svg.png" className="img_status_interface"/>
                            </td>
                        </tr>
                        
                    </table>
                </div>    
            </div>
        </Fragment>
     );
}
 
export default DeviceStatus;