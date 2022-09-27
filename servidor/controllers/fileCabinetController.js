const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs')
const Cabinet = require('../models/Cabinet')


const multerConfiguration = {
    limits: { fileSize: 20 * 1024 * 1024 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname = './cabinetsFiles')
        }, filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);

        }
    })
}
const upload = multer(multerConfiguration).single('cabinetsFiles');

exports.uploadFile = async (req, res, next) => {
    // console.log('En upload fileeeeeeeeeeeeeeeeeee ' + req)
    try {
        const idCabinet = req.params.id;
        let cabinetDB = await Cabinet.findById(idCabinet)
        // console.log(req.file)
        upload(req, res, async (error) => {
            if (!error) {
                console.log("No hay error")
                cabinetDB.files.push(req.file.filename)
                //await cabinetDB.save()
                const cabinet = await Cabinet.findByIdAndUpdate({ _id: idCabinet }, { $set: cabinetDB }, { new: true });
                res.json({
                    ok: true,
                    message: 'Archivo subido correctamente',
                    file: req.file
                })
                //const cabinet = await Cabinet.findByIdAndUpdate({ _id: idCabinet }, { $set: cabinetDB }, { new: true });

            } else {
                console.log(error.message);
                res.status(500).send({ msg: "Hubo un error al subir el archivo" })
                return next();
            }

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Hubo un error al subir el archivo' })
    }
}

exports.deleteFile = async (req, res, next) => {

    try {
        const idCabinet = req.params.id;
        let cabinetDB = await Cabinet.findById(idCabinet)
        try {
            fs.unlinkSync(__dirname + `/../cabinetsFiles/${req.query.fileNameDeleted}`)
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: 'Hubo un error al eliminar el archivo' })
        }

        cabinetDB.files.splice(cabinetDB.files.indexOf(req.query.fileNameDeleted), 1)
        const cabinet = await Cabinet.findByIdAndUpdate({ _id: idCabinet }, { $set: cabinetDB }, { new: true });
        res.send(cabinet)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Hubo un error al eliminar el archivo" })
    }
}
