import React, {useContext, useState, useEffect} from 'react';
import assetContext from '../../context/asset/assetContext';
import { useHistory } from "react-router-dom";
import deviceContext from '../../context/devices/devicesContext';


const HeaderDevice = () => {
    const history = useHistory();
    
    const dContext = useContext(deviceContext)
    const {showForm, searchDevices} = dContext


    const aContext = useContext(assetContext)
    const {asset} = aContext

    const [search, setSearch ] = useState('')

    
    if (!asset) return null

    const onClickNewNode = ()=>{
        
        showForm();
    }
    const onChange = (e)=>{
        setSearch(e.target.value)
        searchDevices(e.target.value)
    }
    
    return (  
        <div className="formulario">
            <div 
                className="contenedor-input">
                <input 
                    type="text"
                    className="input-text"
                    placeholder="buscar device"
                    name="search"
                    value={search}
                    onChange = {onChange}
                />
            </div>
            <div 
                className="contenedor-input"
            >
                <button
                        type="button"
                        className="btn btn-secundario btn-submit btn-block"
                        onClick = {onClickNewNode}
                    >Nuevo Dispositivo</button>
            </div>
            
       </div>
    );
}
 
export default HeaderDevice;