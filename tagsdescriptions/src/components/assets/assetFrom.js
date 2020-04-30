import React, {useContext, useState, Fragment} from 'react';
import assetContext from '../../context/asset/assetContext.js'

const AssetForm = () => {
    
    const aContext = useContext(assetContext)
    
    const {form, showForm, error, addAsset, showError} = aContext

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
            showError()
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
                {error? <p className="mensaje error">El nombre del asset no puede estar vacío</p> : null}
        </Fragment>
     );
}
 
export default AssetForm;