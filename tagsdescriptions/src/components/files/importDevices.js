import React, {useContext, useState, useEffect, Fragment} from 'react';
import authContext from '../../context/auth/authContext'
import importContext from '../../context/import/importContext'
import alertContext from '../../context/alerts/alertContext';
import Header from '../../layout/header';


const ImportDevices = () => {

    const auContext = useContext(authContext)
    const {getUser} = auContext;

    const iContext = useContext(importContext)
    const {processImportFile, message, resetMessage} = iContext

    
    const aContext = useContext(alertContext)
    const {alert, showAlert} = aContext

    const [file, setFile] = useState()

    useEffect(() => {
        if (message){
            console.log(message.msg)
            console.log(message.category)
            showAlert(message.msg,message.category)
            resetMessage();
        }
        // eslint-disable-next-line
    }, [message])

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
                {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null}
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