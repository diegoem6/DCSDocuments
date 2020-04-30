import React, {useContext, useState, useEffect} from 'react';
import systemContext from '../../context/system/systemContext'
import assetContext from '../../context/asset/assetContext'


const SystemForm = () => {

    const sContext = useContext(systemContext)
    const {getSystems, systemSelected, addSystem, updateSystem} = sContext

    const aContext = useContext(assetContext)
    const {asset} = aContext

    const [error, setError] = useState(false)
    const [system,setSystem] = useState({
        name:''
    })

    useEffect(() => {
        if (systemSelected){
            setSystem(systemSelected)
        }else{
            setSystem('')
        }
    }, [systemSelected])
    

    if (!asset) return null;

    const {name} =  system

    const [assetActual] = asset

    const onSubmit = (e)=>{
        e.preventDefault();
        if(name.trim()===''){
            setError(true)
            return;
        }
        setError(false);
        system.asset = assetActual._id
        system.active = false
        if (systemSelected){
            updateSystem(system)
        }else{
            addSystem(system);
        }
        getSystems(assetActual._id)
        console.log("saliendo del getSystem")
        setSystem({name:''});
        
    }
    const onChange = (e)=>{
        setSystem({
            ...system,
            [e.target.name]:e.target.value
        })
    }


    return ( 
        <div className="formulario"
            onSubmit={onSubmit}>
            <form>
                <div 
                    className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre del sistema"
                        name="name"
                        value={name}
                        onChange = {onChange}
                    />
                </div>
                <div 
                    className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={systemSelected === null ? "Agregar sistema":"Guardar sistema"}
                    />
                </div>

            </form>
            {error ? <p className="mensaje error">El nombre del sistema es obligatorio</p> : null}
        </div>
     );
}
 
export default SystemForm;