import React,{Fragment, useState, useContext, useEffect} from 'react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import alertContext from '../../context/alerts/alertContext';
import assetContext from '../../context/asset/assetContext';
import iocardContext from '../../context/iocards/iocardsContext';

const NewIOCard = () => {
    
    
    const asContext = useContext(assetContext)
    const {asset} = asContext

    const iContext = useContext(iocardContext);
    const {iocardsSelected, showForm, createIOCard, updateIOCard, message, resetMessage, getIOCardTypes, iocardtypes, getIOCardControllers_sinB, iocardcontrollers, getIOCardCabinets, iocardcabinets} = iContext

    const aContext = useContext(alertContext)
    const {alert, showAlert} = aContext

    const [iocardName, setIOCardName] = useState('')
    const [iocardType, setIOCardType] = useState('')
    const [iocardController, setIOCardController] = useState('')
    const [iocardIOLink, setIOCardIOLink] = useState('')
    const [iocardDeviceIndex, setIOCardDeviceIndex] = useState('')
    const [iocardRedundant, setIOCardRedundant] = useState(0) //0=no redundante 1=redundante
    const [iocardCabinet, setIOCardCabinet] = useState('')
    const [iocardLocation, setIOCardLocation] = useState('')


    /*const [deviceType, setDeviceType] = useState('')
    const [deviceIP, setDeviceIP] = useState('')
    const [deviceURLOPC, setdeviceURLOPC] = useState('')*/

    
    useEffect(() => { /*tuve que meterlo en un useeffect porque en una funcion entraba dos veces*/
        //console.log(deviceSelected)
        //agregar para los combos de gabinetes y 
        getIOCardTypes() //levanta todos los tipos de IOs
        //getIOCardControllers() //levanta todos los C300
        getIOCardControllers_sinB() //levanta todos los C300 excepto los B
        getIOCardCabinets()
        //console.log("Aca estoy")
        console.log("Entrooooo", iocardcabinets)
        
        if (iocardsSelected !== null && iocardsSelected.length>0){
            //console.log(iocardsSelected)
            const currentIOCard = iocardsSelected[0]
            //console.log(currentIOCard)
            setIOCardName(currentIOCard.tagname)
            setIOCardType(currentIOCard.type)
            setIOCardController(currentIOCard.controllerA)
            setIOCardIOLink(currentIOCard.iolink)
            setIOCardDeviceIndex(currentIOCard.deviceIndex)
            setIOCardRedundant(currentIOCard.redundant)
            setIOCardCabinet(currentIOCard.cabinet) //cabinetDesc
            setIOCardLocation(currentIOCard.sideLocation + "-" + currentIOCard.posLocation)
            console.log(iocardName)
            console.log("Aca estoy: ",currentIOCard)
        }else{
            console.log("Nada seleccionado")
            setIOCardName('')
            setIOCardType('')
            setIOCardController('')
            setIOCardIOLink('')
            setIOCardDeviceIndex('')
            setIOCardRedundant(0) //indica no redundante
            setIOCardCabinet('')
            setIOCardLocation('')
        }
        // eslint-disable-next-line
    }, [iocardsSelected])


    useEffect(() => { //para los errores
        if(message){
            console.log("Aca hay un errror locooo")
            showAlert(message.msg, message.category)
            resetMessage()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])
    
      
 
    
    if (!asset) return null

    const onChangeIOCardName = (e)=>{
        setIOCardName(e.target.value)
    }
    const onChangeIOCardDeviceIndex = (e)=>{
        setIOCardDeviceIndex(e.target.value)
    }
    const onChangeIOCardLocation = (e)=>{
        setIOCardLocation(e.target.value)
    }
    const onClickCancelar = (e) =>{
        showForm();
    }
    
    const onSubmitIOCard = (e)=>{

        e.preventDefault();
        if(iocardName==="")
            {showAlert("Se debe ingresar un tagname de la IO", "alerta-error")
            return
            }
        if(iocardType==="")
            {showAlert("Se debe ingresar un tipo de IO", "alerta-error")
            return
            }
        if(iocardController==="") //aca debería comparar con que haya ingresado al menos un controlador... ver
            {showAlert("Se debe ingresar un controlador asociado", "alerta-error")
            return
            }
        
        const newIOCard = {}
        newIOCard.tagname = iocardName;
        newIOCard.type = iocardType;
        newIOCard.iolink = iocardIOLink;
        newIOCard.deviceIndex = iocardDeviceIndex;
        newIOCard.redundant = iocardRedundant;
        newIOCard.cabinet = iocardCabinet;
        newIOCard.location = iocardLocation;
        newIOCard.controllerA = iocardController;
        newIOCard.asset = asset[0]._id;
        console.log(newIOCard)
        
        if(iocardsSelected===null) /*Nuevo*/
            createIOCard(newIOCard)
        else{ /*update*/ 
            //console.log("Entro Update");
            newIOCard._id=iocardsSelected[0]._id; /* le agrego el ID porque es existente */
            updateIOCard(newIOCard)
        }
        //}
    }

       
    return ( 
        <Fragment>
            {alert? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    :null}
                <h2>IOCard en el asset: {asset[0].name}</h2>
                <div className="formNode">
                    <div className="node">
                        <form   
                            className="formulario-nuevo-proyecto"
                            onSubmit = {onSubmitIOCard}
                            >
                            <input  
                                type="text"
                                className={`input-text`}
                                placeholder="IO tagname"
                                name="iocardName"
                                value ={iocardName}
                                onChange = {onChangeIOCardName}
                            />
                            <select className={`input-text`}
                                onChange={e => setIOCardController(e.target.value)}
                                value={iocardController} //esto es para que se mantenga seleccionado lo que elegi en el combo, sino vuelve al que estaba antes
                             >
                                <option key="nada" value="">Seleccione el Controlador asociado</option> 
                                {//filtrar por devicetype: C300, si al final tiene la letra A o B quitarla y sacar los repetidos:
                                iocardcontrollers ?
                                iocardcontrollers.map(diocardc=>( //al ser un array puedo utilizar map, que siempre requiere de un key
                                    
                                

                                
                                
                                    //diocardc.deviceName ? //aca hay que verificar si no termina en B
                                        <option key={diocardc._id} value={diocardc._id}>{diocardc.deviceName}</option>
                                    //: null
                                ))
                                : null
                                }
                             </select>
                            
                            <select className={`input-text`}
                                onChange={e => setIOCardType(e.target.value)}
                                value={iocardType} //esto es para que se mantenga seleccionado lo que elegi en el combo, sino vuelve al que estaba antes
                             >
                                <option key="nada" value="">Seleccione el tipo de tarjeta IO</option> 
                                {//filtrar por devicetype: C300, si al final tiene la letra A o B quitarla y sacar los repetidos:
                                iocardtypes ?
                                iocardtypes.map(diocardtype=>( //al ser un array puedo utilizar map, que siempre requiere de un key
                                    <option key={diocardtype._id} value={diocardtype._id}>{diocardtype.type}</option>
                                ))
                                : null
                                }
                             </select>
                            
                            <select className={`input-text`}
                                onChange={e => setIOCardIOLink(e.target.value)}
                                value={iocardIOLink} //esto es para que se mantenga seleccionado lo que elegi en el combo, sino vuelve al que estaba antes
                             >
                                <option key="nada" value="">Seleccione el IO Link</option>
                                    <option key={1} value={"1"}>IOL1 - GRIS</option>
                                    <option key={2} value={"2"}>IOL2 - VIOLETA</option>
                                
                            </select>
                            
                            <input  
                                type="text"
                                className={`input-text`}
                                placeholder="Device Index"
                                name="iocardDeviceIndex"
                                value ={iocardDeviceIndex}
                                onChange = {onChangeIOCardDeviceIndex}
                            />
                            
                            <select className={`input-text`}
                                onChange={e => setIOCardCabinet(e.target.value)}
                                value={iocardCabinet} //esto es para que se mantenga seleccionado lo que elegi en el combo, sino vuelve al que estaba antes
                             >
                                <option key="nada" value="">Seleccione el Gabinete</option>
                                {//cargo todos los gabinetes:
                                iocardcabinets ?
                                iocardcabinets.map(iocab=>( //al ser un array puedo utilizar map, que siempre requiere de un key
                                    <option key={iocab._id} value={iocab._id}>{iocab.cabinetName}</option>
                                ))
                                : null
                                }
                             </select>

                             <input  
                                type="text"
                                className={`input-text`}
                                placeholder="Location"
                                name="iocardLocation"
                                value ={iocardLocation}
                                onChange = {onChangeIOCardLocation}
                            />

                            {iocardsSelected===null ?  
                                (<input 
                                type="button"
                                className="btn btn-primario btn-block"
                                onClick = {onSubmitIOCard}
                                value = "Agregar IO"
                                />
                                )
                                :
                                (<input 
                                    type="button"
                                    className="btn btn-primario btn-block"
                                    onClick = {onSubmitIOCard}
                                    value = "Guardar IO"
                                    />
                                )
                            }
                                <input 
                                    type="button"
                                    className="btn btn-primario btn-block"
                                    onClick = {onClickCancelar}
                                    value = "Cancelar"
                                />
                        </form>
                    </div>
                    
                </div>
                
        </Fragment>
     );
}
 
export default NewIOCard;