import { stat } from 'fs';
import React, {useState, useContext, useEffect,Fragment} from 'react';
import deviceContext from '../../context/devices/devicesContext'
import C300 from './C300'
import PGM from './PGM';

const DeviceStatus = () => {
    
    const devicestatusID=localStorage.getItem('devicestatusID');
    const dContext = useContext(deviceContext)
    const {getDevice, getDeviceType, networkmodelo, deviceSelected, devicetype, getDeviceStatus, status} = dContext

    const [deviceTipo, setDeviceTipo] = useState('')


    useEffect(() => {
        if (devicestatusID){
            getDevice(devicestatusID)
            getDeviceStatus(devicestatusID)
            //console.log("El nodo seleccionado es: ",networkNodeSelected) //aca me quede no se por que no trae nada networkNodeSelected, pero si tiene...
            }
        else{
            return <h2>Seleccione un dispositivo</h2>
        }
    // eslint-disable-next-line
    }, [devicestatusID])

    useEffect(() => {
        if(status && deviceSelected){
            deviceSelected.status_=status
            getDeviceType(deviceSelected.deviceType);
        }
    }, [deviceSelected, status])

    useEffect(() => {
        if(devicetype){
            setDeviceTipo(devicetype.type)
            deviceSelected.type_desc =  devicetype
        }
    }, [devicetype])

    const deviceStatus = {
        "pgm": [
            {
                "PBLINK1": {
                    "slaves": [
                        {
                            "DSB_Name": "302_42_136_DSB",
                            "Slave_Num": 75,
                            "Slave_Tipo": "ABB UMC22 Starter",
                            "State": "on"
                        },
                        {
                            "DSB_Name": "302_42_139_DSB",
                            "Slave_Num": 78,
                            "Slave_Tipo": "ABB UMC22 Starter",
                            "State": "on"
                        },
                        {
                            "DSB_Name": "300_40_151_DSB",
                            "Slave_Num": 102,
                            "Slave_Tipo": "DIRIS A40",
                            "State": "on"
                        },
                        {
                            "DSB_Name": "300_86_301_DSB",
                            "Slave_Num": 101,
                            "Slave_Tipo": "DIRIS A40",
                            "State": "off"
                        },
                        {
                            "DSB_Name": "301_42_066_DSB",
                            "Slave_Num": 64,
                            "Slave_Tipo": "ABB UMC22 Starter",
                            "State": "on"
                        },
                        {
                            "DSB_Name": "301_42_067_DSB",
                            "Slave_Num": 65,
                            "Slave_Tipo": "ABB UMC22 Starter",
                            "State": "on"
                        },
                        {
                            "DSB_Name": "302_42_078_DSB",
                            "Slave_Num": 57,
                            "Slave_Tipo": "ABB UMC22 Starter",
                            "State": "on"
                        },
                        {
                            "DSB_Name": "302_42_007_DSB",
                            "Slave_Num": 32,
                            "Slave_Tipo": "ABB UMC22 Starter",
                            "State": "on"
                        },
                        {
                            "DSB_Name": "302_42_061_DSB",
                            "Slave_Num": 51,
                            "Slave_Tipo": "ABB UMC22 Starter",
                            "State": "on"
                        },
                        {
                            "DSB_Name": "302_42_062_DSB",
                            "Slave_Num": 52,
                            "Slave_Tipo": "ABB UMC22 Starter",
                            "State": "on"
                        },
                        {
                            "DSB_Name": "302_42_111_DSB",
                            "Slave_Num": 67,
                            "Slave_Tipo": "ABB UMC22 Starter",
                            "State": "off"
                        }
                    ],
                    "properties": {
                        "name": "302C2PB02L01",
                        "linknum": 0,
                        "fielnetwrktype": "PROFIBUS DP",
                        "cpuload": 70,
                        "state": "ONLINE"
                    }
                }
            },
            {
                "PBLINK2": {
                    "slaves": [],
                    "properties": {
                        "name": "302C2PB02L02",
                        "linknum": 0,
                        "fielnetwrktype": "PROFIBUS DP",
                        "cpuload": 70,
                        "state": "OFFLINE"
                    }
                }
            }, 
            {
                "state": {
                    "bcmstate": "OK", //state
                    "modisredun": "off", //redundancy
                    "cpufreeavg": 78.85, //cpu free avg
                    "freememink": 9752, //free memory
                    "ctemp": 37.25, //current temperature
                    "pktstxavg" : 60, //pda packet sent avg
                    "pktsrxavg" : 20, //pda packet received avg
                    "pdcmsgavg": 1640, //pdc messages avg
                    "cda_averagedisplayparams": 3.67,
                    "softfailure": [
                        {
                            "label": "Device index switches changes",
                            "value": "on"
                        },
                        {
                            "label": "Factory data error",
                            "value": "on"
                        },
                        {
                            "label": "ROM Application Image Checksum",
                            "value": "off"
                        },
                        {
                            "label": "ROM Boot Image Checksum Failure",
                            "value": "off"
                        },
                        {
                            "label": "WDT Hardware Failure",
                            "value": "on"
                        },
                        {
                            "label": "WDT Refresh Warning",
                            "value": "off"
                        },
                        {
                            "label": "Critical Task Watchdog Warning",
                            "value": "on"
                        },
                        {
                            "label": "Uncorrectable Internal RAM Sweep Error",
                            "value": "off"
                        },
                        {
                            "label": "Corrected User RAM Sweep Error",
                            "value": "on"
                        },
                        {
                            "label": "Debug Flag Enabled",
                            "value": "on"
                        },
                        {
                            "label": "Minimum HW Revision",
                            "value": "off"
                        },
                        {
                            "label": "Partner Not Visible On FTE",
                            "value": "on"
                        }
                    ]
                }
            }
        ]
    }
    const deviceStatusC300v2 = 
    {
        "c300": {
            "state": [
                {
                    "property": "C300STATE",
                    "label": "Status",
                    "value": "CEERUN"
                },
                {
                    "property": "lanafailed",
                    "label": "FTE A",
                    "value": 0
                },
                {
                    "property": "lanbfailed",
                    "label": "FTE B",
                    "value": 0
                },
                {
                    "property": "cpufreeavg",
                    "label": "CPU Free (%)",
                    "value": 95.64918518066406
                },
                {
                    "property": "ctemp",
                    "label": "Temp (°C)",
                    "value": 42
                },
                {
                    "property": "rdnrolestate",
                    "label": "Redundancy",
                    "value": "NonRedun"
                },
                {
                    "property": "interlanfailed",
                    "label": "FTE InterLAN comm. failed",
                    "value": 0
                },
                {
                    "property": "xoverfailed",
                    "label": "FTE crossover cable field",
                    "value": 0
                }
            ],
            "softfailure": [
                {
                    "property": "BCDSWSTS",
                    "label": "Battery State Warning",
                    "value": 0
                },
                {
                    "property": "BCDSWSTS",
                    "label": "Device Index Switches Changed",
                    "value": 0
                },
                {
                    "property": "FACTDATAERR",
                    "label": "Factory Data Error",
                    "value": 0
                },
                {
                    "property": "ROMAPPIMGCHKSMFAIL",
                    "label": "ROM Application Image Checksum Failure",
                    "value": 0
                },
                {
                    "property": "ROMBOOTIMGCHKSMFAIL",
                    "label": "ROM Boot Image Checksum Failure",
                    "value": 0
                },
                {
                    "property": "WDTHWFAIL",
                    "label": "WDT Hardware Failure",
                    "value": 0
                },
                {
                    "property": "WDTSWFAIL",
                    "label": "WDT Refresh Warning",
                    "value": 0
                },
                {
                    "property": "TASKHLTHMON",
                    "label": "Critical Task Watchdog Warning",
                    "value": 0
                },
                {
                    "property": "RAMSWEEPERR",
                    "label": "Uncorrectable Internal RAM Sweep Error",
                    "value": 0
                },
                {
                    "property": "RAMSCRUBERRS",
                    "label": "Corrected Internal RAM Sweep Error",
                    "value": 0
                },
                {
                    "property": "BACKUPRAMSWEEPERR",
                    "label": "Uncorrected User RAM Sweep Error",
                    "value": 0
                },
                {
                    "property": "BACKUPRAMSCRUBERRS",
                    "label": "Corrected User RAM Sweep Error",
                    "value": "oNaNn"
                },
                {
                    "property": "IOL1SOFTFAIL",
                    "label": "IOLINK(1) Soft Fail Error",
                    "value": 0
                },
                {
                    "property": "IOL2SOFTFAIL",
                    "label": "IOLINK(2) Soft Fail Error",
                    "value": 0
                },
                {
                    "property": "DEBUGFLAGSET",
                    "label": "Debug Flag Enabled",
                    "value": 0
                },
                {
                    "property": "MINHWREVSF",
                    "label": "Minimum HW Revision",
                    "value": 0
                },
                {
                    "property": "PARTNERNOTVISFTE",
                    "label": "Partner Not Visible on FTE",
                    "value": 0
                }
            ]
        }
    }
    const deviceStatusC300 = {
        "c300": {
            "state": {
                "c300state": "CEE RUN", //state
                "lanafailed": "OFF", //FTE A Status
                "lanbfailed": "ON", //FTE B Status
                "cpufreeavg": 97.22, //CPU Free (%)
                "ctemp": 37.25, //Temp (Â°C)
                "rdnrolestate" : "NONREDUND", //redundancy
                "interlanfailed" : "OFF", //fte interlan comm. failed
                "xoverfailed": "OFF", //fte crossover cable field
                "softfailure": [
                    {
                        "label": "Battery State Warning",
                        "value": "on"
                    },
                    {
                        "label": "Device Index Switches Changed",
                        "value": "on"
                    },
                    {
                        "label": "Factory Data Error",
                        "value": "off"
                    },
                    {
                        "label": "ROM Application Image Checksum Failure",
                        "value": "off"
                    },
                    {
                        "label": "ROM Boot Image Checksum Failure",
                        "value": "on"
                    },
                    {
                        "label": "WDT Hardware Failure",
                        "value": "off"
                    },
                    {
                        "label": "WDT Refresh Warning",
                        "value": "on"
                    },
                    {
                        "label": "Critical Task Watchdog Warning",
                        "value": "off"
                    },
                    {
                        "label": "Uncorrectable Internal RAM Sweep Error",
                        "value": "on"
                    },
                    {
                        "label": "Corrected Internal RAM Sweep Error",
                        "value": "on"
                    },
                    {
                        "label": "Uncorrected User RAM Sweep Error",
                        "value": "off"
                    },
                    {
                        "label": "Corrected User RAM Sweep Error",
                        "value": "on"
                    },
                    {
                        "label": "IOLINK(1) Soft Fail Error",
                        "value": "on"
                    },
                    {
                        "label": "IOLINK(2) Soft Fail Error",
                        "value": "on"
                    },
                    {
                        "label": "Debug Flag Enabled",
                        "value": "on"
                    },
                    {
                        "label": "Minimum HW Revision",
                        "value": "on"
                    },
                    {
                        "label": "Partner Not Visible on FTE",
                        "value": "on"
                    }
                ]
            }
        }
    }

    console.log(deviceSelected)
    return ( 
        <Fragment>
            
                
            {(deviceSelected && deviceSelected.status_) ? 
                <div>
                    <h1>{deviceTipo} : {deviceSelected.deviceName}</h1>
                    <h2>{deviceSelected.deviceDescription}</h2>
                    <h2>IP: {deviceSelected.deviceIP}</h2>
                    { deviceTipo === "C300" ? 
                        <C300 
                            deviceSelected = {deviceSelected} /> 
                            :
                        <PGM
                            deviceSelected = {deviceSelected} /> 
                    }
                </div>
                : 
                null 
            }
        </Fragment>
     );
}
 
export default DeviceStatus;