import React, { useContext } from 'react';
import CabinetsContext from '../../context/cabinets/cabinetsContext';
import assetContext from '../../context/asset/assetContext';
import alertContext from '../../context/alerts/alertContext';

const HeaderCabinets = () => {
    const cabContext = useContext(CabinetsContext);
    const { showForm } = cabContext;

    const aContext = useContext(assetContext);
    const { asset } = aContext;
    const alContext = useContext(alertContext)
    const { showAlert } = alContext
    const onClickNewCabinet = () => {
        if (!asset) {
            showAlert("Debe seleccionar un Asset!", "alerta-error")
            return
        }
        showForm(true)
        //  showForm();
    }


    return (
        <div className="formulario">

            <div
                className="contenedor-input"
            >
                <button
                    type="button"
                    className="btn btn-secundario btn-submit btn-block"
                    onClick={onClickNewCabinet}
                >Nuevo Gabinete </button>
            </div>

        </div>
    );
}

export default HeaderCabinets;