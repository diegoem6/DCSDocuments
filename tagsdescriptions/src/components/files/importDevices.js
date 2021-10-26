import React, {useContext, useState, useEffect, Fragment} from 'react';
import authContext from '../../context/auth/authContext'
import deviceContext from '../../context/devices/devicesContext'
import alertContext from '../../context/alerts/alertContext';
import Header from '../../layout/header';


const ImportDevices = () => {

    const auContext = useContext(authContext)
    const {getUser} = auContext;

    const dContext = useContext(deviceContext)
    const {processImportFile} = dContext

    
    const aContext = useContext(alertContext)
    const {alert} = aContext

    const [file, setFile] = useState()

    useEffect(() => {
        getUser();
       // eslint-disable-next-line
    }, [])
    
    const changeHandler = (e) =>{
        setFile(e.target.files[0])
    }

    const submitFile =(e) =>{
        e.preventDefault()
        processImportFile(file)
    }
    return ( 
        <Fragment>
            <Header />
            <div className="form-menu">
                <div className="contenedor-form sombra-dark">
                    
                    <div className="campo-form"> 
                        <input 
                            type="file" 
                            className="custom-file-input" 
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="campo-form">
                            <button 
                                className="btn btn-block btn-primario"
                                onClick = {submitFile}
                            >
                                Procesar archivo
                            </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default ImportDevices;