import React, {useContext, useState, Fragment, useEffect} from 'react';
import assetContext from '../../context/asset/assetContext.js'
import alertContext from '../../context/alerts/alertContext.js'

const AssetForm = () => {
    
    const aContext = useContext(assetContext)
    
    const {form, showForm, message, addAsset, resetMessage} = aContext

    const alContext = useContext(alertContext)
    const {showAlert} = alContext

    const [asset, setAsset] = useState({
        name:''
    })
    const {name} = asset
    
    const onChangeAsset = (e)=>{
        setAsset({
            ...asset, 
            [e.target.name]: e.target.value
        })
    }

    const onSubmitAsset= (e)=>{
        e.preventDefault();

        //hacer validaciones y reseteo de form
        if (!name){
            showAlert("El nombre del asset no debe estar vacío", "alerta-error")
            return;
        }

        // llamo a agregar proyecto
        addAsset(asset)
        setAsset("")
        
    }

    const onClikcAddAsset = (e)=>{
        showForm();
    }
    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick = {onClikcAddAsset}
            >Nuevo Asset</button>

            {form ?
                (
                    <form   
                        className="form-new-system"
                        onSubmit = {onSubmitAsset}
                        >
                        <input  
                            type="text"
                            className="input-text"
                            placeholder="Nombre del asset"
                            name="name"
                            value ={name}
                            onChange = {onChangeAsset}
                        />
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value = "Agregar asset"
                        />    
                    </form>
                ):
                (null)
                }
                
        </Fragment>
     );
}
 
export default AssetForm;