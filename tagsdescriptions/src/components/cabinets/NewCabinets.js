import React, { useState, useContext, useEffect, useCallback } from 'react'
import CabinetsContext from '../../context/cabinets/cabinetsContext';
import assetContext from '../../context/asset/assetContext';
import alertContext from '../../context/alerts/alertContext';
import { useDropzone } from 'react-dropzone'
import { Fragment } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import QRCode from "react-qr-code";

const NewCabinets = () => {
    //Obtengo el state para los gabinetes
    const cabContext = useContext(CabinetsContext);
    const aContext = useContext(assetContext);
    const {
        showForm,
        createCabinet,
        updateCabinet,
        cabinetSelected,
        areas,
        getAreas,
        message,
        resetMessage,
        deleteFileCabinet,
        uploadFileCabinet } = cabContext;

    const { asset } = aContext;
    const alContext = useContext(alertContext)
    const { alert, showAlert } = alContext
    //State local
    const [cabinetName, setCabinetName] = useState('')
    const [area, setCabinetArea] = useState('');
    const [cabinetDescription, setCabinetDescription] = useState('')
    const [cabinetLatitude, setCabinetLatitude] = useState('')
    const [cabinetLongitude, setCabinetLongitude] = useState('')
    const [cabinetSize, setCabinetSize] = useState('')
    const [files, setFiles] = useState([]);
    const [filesToDelete, setFilesToDelete] = useState([]);



    //Cargo las áreas para el select
    useEffect(() => {
        getAreas();
        console.log("Cargando areas");
        console.log(areas);
        if (cabinetSelected) {
            setCabinetName(cabinetSelected.cabinetName);
            setCabinetArea(cabinetSelected.area)
            setCabinetLatitude(cabinetSelected.cabinetLatitude)
            setCabinetLongitude(cabinetSelected.cabinetLongitude)
            setCabinetSize(cabinetSelected.cabinetSize)
            setCabinetDescription(cabinetSelected.cabinetDescription)

        } else {
            setCabinetName('');
            setCabinetArea('');
            setCabinetLatitude('');
            setCabinetLongitude('');
            setCabinetSize('');
            setCabinetDescription('');

        }
        //getCabinets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cabinetSelected])



    useEffect(() => { //para los errores
        if (message) {
            showAlert(message.msg, message.category)
            resetMessage()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    const onChangeCabinetName = e => {
        setCabinetName(e.target.value)
    }
    const onChangeLatitude = e => {
        setCabinetLatitude(e.target.value)
    }
    const onChangeLongitude = e => {
        setCabinetLongitude(e.target.value)
    }
    const onChangeDescription = e => {
        setCabinetDescription(e.target.value)
    }

    const onSubmitNewCabinet = async (e) => {

        e.preventDefault();
        //Controlo que se completen todos los campos
        if ([cabinetName, area, cabinetDescription, cabinetLatitude, cabinetLongitude, cabinetSize].includes('')) {
            showAlert('Todos los campos son obligatorios', "alerta-error")

            return
        }

        //Creo el objeto con los datos del gabinete
        const newCabinet = {
            cabinetName,
            area,
            cabinetDescription,
            cabinetLatitude,
            cabinetLongitude,
            cabinetSize,
            asset: asset[0]._id
        }
        //console.table(newCabinet)
        if (!cabinetSelected) {
            createCabinet(newCabinet); //nuevo gabinete
            //alert('NewCabinets');
        } else {
            //Actualizo el gabinete

            uploadFileCabinet(cabinetSelected, files)

            // console.log('UpdateCabinets', newCabinet);
            newCabinet._id = cabinetSelected._id;
            updateCabinet(newCabinet)

        }

    }


    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [])

    const { getRootProps, getInputProps, open } = useDropzone({ onDrop });

    const delFileCabinet = (idCabinet, fileNameDeleted, saved) => {
        // console.log(idCabinet, fileNameDeleted, saved)
        if (saved) {

            deleteFileCabinet(idCabinet, fileNameDeleted)
            setFilesToDelete([...filesToDelete, fileNameDeleted])

        } else {

            const newAttachs = files.filter(file => file.name !== fileNameDeleted.name)
            setFiles(newAttachs)
        }

    }

    //const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
    const filesSaved = cabinetSelected
        ? cabinetSelected.files
            ? cabinetSelected.files.map(file => {
                if (filesToDelete.length > 0) {
                    if (filesToDelete.includes(file)) {
                        return null
                    } else {

                        return (
                            <li className="tarea sombra"
                                key={file}
                            >
                                <img
                                    alt={file}
                                    src={`${process.env.REACT_APP_BACKEND_URL}//${file}`}
                                    style={{ width: '100px', height: '100px' }}
                                />
                                {/*file*/}
                                <button
                                    type="button"
                                    className="btn btn-terciario"
                                    onClick={() => showDialogConfirm(cabinetSelected._id, file, true)}
                                >Eliminar</button>
                            </li>
                        )
                    }
                } else {
                    return (
                        <li className="tarea sombra"
                            key={file}
                        >
                            <img
                                alt={file}
                                src={`${process.env.REACT_APP_BACKEND_URL}//${file}`}
                                style={{ width: '100px', height: '100px' }}
                            />
                            {/*file*/} <button
                                type="button"
                                className="btn btn-terciario"
                                onClick={() => showDialogConfirm(cabinetSelected._id, file, true)}
                            >Eliminar</button>
                        </li>
                    )
                }
            }) : null : null;


    const filesTemp = files.map(file => (
        <li className="tarea sombra"
            key={file.path}
        >
            <img
                alt={file.path}
                src={`${process.env.REACT_APP_BACKEND_URL}//${file.path}`}
                style={{ width: '100px', height: '100px' }}
            />
            <button
                type="button"
                className="btn btn-terciario"
                onClick={() => showDialogConfirm(cabinetSelected._id, file, false)}
            >Eliminar</button>
        </li>
    ));

    const showDialogConfirm = (idCabinet, file, saved) => {
        // console.log(idCabinet)
        // console.log(file)
        confirmAlert({
            title: 'Confirmar',
            message: '¿Estás seguro de eliminar el adjunto?',
            buttons: [
                {
                    label: 'Yes',
                    /*onClick: () => console.log("si")*/
                    onClick: () => delFileCabinet(idCabinet, file, saved)
                },
                {
                    label: 'No'
                    //onClick: () => console.log("no")
                }
            ]
        });
    }


    return (
        <>

            {
                alert ? (<div className={`alerta ${alert.category}`}>{alert.msg} </div>)
                    : null
            }

            <div className="formNode">
                <div className="node">
                    <h2>Gabinete en el asset: {asset[0].name}</h2>
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitNewCabinet}
                    >
                        <input
                            type="text"
                            className={`input-text`}
                            placeholder="Nombre del Gabinete"
                            name="cabinetName"
                            value={cabinetName}
                            onChange={onChangeCabinetName}
                        />
                        <select name="area" id="area"
                            onChange={e => setCabinetArea(e.target.value)}
                            value={area}
                            className={`input-text`}
                        >
                            <option key="qwe" value="">Seleccione un area</option>
                            {//cargo todos las áreas:
                                areas ?
                                    areas.map(a => {
                                        return ( //Recorro las áreas y dibujo un option por cada una
                                            <option key={a.area} value={a.area}>{a.description}</option>
                                        )
                                    })
                                    :
                                    null
                            }
                        </select>
                        <input
                            type="text"
                            className={`input-text`}
                            placeholder="Latitud del Gabinete "
                            name="latitude"
                            value={cabinetLatitude}
                            onChange={onChangeLatitude}

                        />
                        <input
                            type="text"
                            className={`input-text`}
                            placeholder="Longitud del Gabinete"
                            name="longitude"
                            value={cabinetLongitude}
                            onChange={onChangeLongitude}
                        />
                        <select name="size" id="size"
                            className={`input-text`}
                            onChange={e => setCabinetSize(e.target.value)}
                            value={cabinetSize}
                        >
                            <option value="">Seleccione Tamaño del Gabinete (Slots)</option>
                            <option value="1">12</option>
                            <option value="2">24</option>
                        </select>
                        <textarea name="cabinetDescription" cols="30" rows="2"
                            className={`input-text`}
                            placeholder="Descripción del Gabinete"
                            value={cabinetDescription}
                            onChange={onChangeDescription}
                        ></textarea>

                        <Fragment>
                            <div {...getRootProps({ className: 'invoiceBox' })} >
                                <input
                                    {...getInputProps()}
                                />
                                <button
                                    disabled={!cabinetSelected}
                                    type="button"
                                    onClick={cabinetSelected && open}
                                    className="custom-file-input "
                                >
                                </button>
                                {cabinetSelected
                                    ? <label>*Si desea agregar más de un archivo mantenga presionado ctrl.</label>
                                    : <label>*Para agregar archivos debe de crear el Gabinete.</label>}
                            </div>
                            <aside className="descriptor">

                                <h4>Archivos</h4>

                                <ul>
                                    {filesTemp}
                                    {filesSaved}
                                </ul>
                            </aside>
                            <div style={{ height: "auto", margin: "0 auto", maxWidth: 140, width: "100%" }}>
                                <QRCode
                                    size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value={`localhost:3000/CabinetStatus/${cabinetName}`}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                        </Fragment>

                        <input type="submit" className="btn btn-primario btn-block" value={cabinetSelected ? 'Guardar Gabinete' : 'Crear Gabinete'} />

                        <input
                            type="button"
                            className="btn btn-primario btn-block"
                            onClick={() => showForm(false)}
                            value="Cancelar"
                        />

                    </form>
                </div>
            </div>
        </>
    )
}

export default NewCabinets