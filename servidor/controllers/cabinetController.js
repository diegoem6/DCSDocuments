const Area = require('../models/Area')
const Asset = require('../models/Asset')
const Cabinet = require('../models/Cabinet')
const { validationResult } = require('express-validator');



exports.addCabinet = async (req, res) => {

    // console.log(req.body)
    //Revisar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }

    //Guardar el nuevo objeto en la base de datos
    try {
        //existe el asset?
        const asset_updated = await Asset.findById(req.body.asset)
        if (!asset_updated) {
            console.log("No existe el asset");
            return res.status(404).send({ msg: "No existe el asset" })
        }


        const newCabinet = new Cabinet(req.body);

        await newCabinet.save()
        res.json({ newCabinet })

    } catch (error) {
        // console.log(error.message);
        if (error.message.includes('duplicate key error')) {
            return res.status(400).send({ msg: 'Ya existe un gabinete con ese nombre' })
        }
        res.status(500).send({ msg: "No se pudo crear el gabinete, contacte a un administrador" });

    }
} //end addCabinet

exports.updateCabinet = async (req, res) => {
    //Revisar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Extraer los datos del cuerpo de la petición
    const { cabinetName, cabinetDescription, cabinetLatitude, cabinetLongitude, cabineteSize, area, _id } = req.body;

    try {
        //Buscar el gabinete a actualizar

        const cabinetUpdate = await Cabinet.findById(req.params.id);
        if (!cabinetUpdate) {
            // console.log("No existe el gabinete");
            return res.status(404).send({ msg: "No existe el Gabinete" })
        }
        //Actualizar el gabinete
        // cabinetUpdate._id
        cabinetUpdate.cabinetName = cabinetName;
        cabinetUpdate.cabinetDescription = cabinetDescription;
        cabinetUpdate.cabinetLatitude = cabinetLatitude;
        cabinetUpdate.cabinetLongitude = cabinetLongitude;
        cabinetUpdate.cabineteSize = cabineteSize;
        cabinetUpdate.area = area;
        await cabinetUpdate.save();
        // cabinetUpdate = await Cabinet.findOneAndUpdate({ _id: req.params.id }, cabinetUpdate, { new: true });
        res.json({ cabinetUpdate })
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Error actualizando el gabinete" });
    }
} //end updateCabinet

exports.getCabinet = async (req, res) => {
    //console.log(req.params.id);
    try {
        //existe el asset?
        /*const asset_updated = await Asset.findById(req.body.asset)
        if (!asset_updated) {
            console.log("No existe el asset");
            return res.status(404).send("No existe el asset")
        }*/

        const cabinet = await Cabinet.findById(req.params.id);
        if (!cabinet) {
            console.log('No existe el gabinete');
            return res.status(404).send({ msg: 'No Existe el Gabinete' });
        }
        res.json({ cabinet });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} //end getCabinet

exports.getCabinets = async (req, res) => {
    //controlo que no haya errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //console.log(req.query);
    const { assetId } = req.query
    try {
        //existe el asset?
        const asset_updated = await Asset.findById(assetId)
        if (!asset_updated) {
            console.log("No existe el asset");
            return res.status(404).send("No existe el asset")
        }

        //busco todos los gabinetes 
        const cabinets = await Cabinet.find({ asset: asset_updated._id }).sort({ creado: -1 });
        res.json({ cabinets });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} //end getCabinets

exports.deleteCabinet = async (req, res) => {
    try {
        //existe el asset?

        const cabinet = await Cabinet.findById(req.params.id);
        if (!cabinet) {
            console.log('No existe el gabinete');
            return res.status(404).send({ msg: 'No Existe el Gabinete' });
        }
        await Cabinet.findOneAndDelete({ _id: req.params.id });
        res.json({ msg: 'Gabinete Eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} //end deleteCabinet
exports.getAreas = async (req, res) => {
    try {
        //Busco todas las areas
        const areas = await Area.find().sort({ create: -1 });
        res.json({ areas });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}//end getAreas
