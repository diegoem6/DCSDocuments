/* eslint-disable no-undef */
import React, { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import CabinetsContext from '../../context/cabinets/cabinetsContext';

const Cabinet = ({ cabinet }) => {

    const cabContext = useContext(CabinetsContext)
    const { deleteCabinet, showForm, selectCabinet, getCabinetbyName } = cabContext

    // useEffect(()=>{
    //     if(cabinetSelected){
    //         console.log(cabinetSelected.files)
    //     }
    // }, [cabinetSelected])

    const delCabinet = () => {
        deleteCabinet(cabinet._id)

    }
    const editCabinet = (cabinet) => {
        //console.log(networkNode)
        selectCabinet(cabinet._id);
        //selectNetworkNode(networkNode._id);
        showForm();
    }
    const showDialogConfirm = () => {
        confirmAlert({
            title: 'Confirmar',
            message: '¿Estás seguro de eliminar el gabinete?',
            buttons: [
                {
                    label: 'Yes',
                    /*onClick: () => console.log("si")*/
                    onClick: () => delCabinet(cabinet._id)
                },
                {
                    label: 'No'
                    //onClick: () => console.log("no")
                }
            ]
        });
    }

    return (
        <li className="tarea sombra">
            <p>{cabinet.cabinetName} </p>
            <p>{cabinet.cabinetDescription}</p>
            <div className="acciones">

                {/* <a 
                    target='_blank'
                    href={`${process.env.REACT_APP_SHOWTAG_URL}/showTagDescriptor/${tagdescriptor.tagname}`}
                    className="btn btn-primario">
                    Ver
                </a> */}

                <button
                    type="button"
                    className="btn btn-terciario"
                    onClick={showDialogConfirm}
                >Eliminar</button>

                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => { editCabinet(cabinet) }}
                >Editar </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => {
                        /*
                        getCabinet(cabinet._id)
                        console.log(cabinet._id)
                        localStorage.setItem('cabinetstatusID', cabinet._id) //guardo en el localstorage una variable tagdescriptorID con el dato tagdescriptor._id
                        window.open('/CabinetStatus/' + cabinet._id) // /events esta definido en app.js
                        */
                        getCabinetbyName(cabinet.cabinetName)
                        window.open('/CabinetStatus/' + cabinet.cabinetName) // /events esta definido en app.js

                    }
                        /*<NetworkStatus />*/
                    }
                >Status</button>
                {/* <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={showDialogConfirm}
                >Confirm</button> */}
            </div>
        </li>

    )
}

export default Cabinet