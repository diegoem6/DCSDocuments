const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs')
const readXlsxFile = require('read-excel-file/node')
const NetworkNode = require('../models/NetworkNode');
const TagDescriptor = require('../models/TagDescriptor')
const Device = require('../models/Device')

const multerConfiguration = {
    limits: {fileSize : 20*1024*1024 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, __dirname='../servidor/files')
        },filename: (req, file, cb) =>{
            //const extension = file.mimetype.split('/')[1];
            const extension = "xls"
            //cb(null, `${shortid.generate()}.${extension}`);
            cb(null, `file_to_process.${extension}`);
    
        }
    })
}
const upload = multer(multerConfiguration).single('fileToProcess');

exports.processFile = async(req, res)=>{
    try {
        upload(req, res, async(error)=>{
            if(!error){
                const dataSheet1 = await readXlsxFile('../servidor/files/file_to_process.xls', { sheet: 1 })
                const model = dataSheet1[0][1]
                const dataSheet2 = await readXlsxFile('../servidor/files/file_to_process.xls', { sheet: 2 })
                let headers = true;
                for (const row in dataSheet2) {  
                    if (headers){
                        headers = false;
                    } else{
                        try{
                            await processRow (model, dataSheet2[0], dataSheet2[row])
                        }catch (error) {
                            const errorMsg = `${error.message} (fila ${row})`
                            console.log(errorMsg)
                            res.status(500).send({msg:errorMsg})
                            return;
                        }
                        
                    }
                    
                }
                res.json({msg:"se procesó el archivo correctamente"})
                return;
            }
        })
    } 
    catch (error) {
        res.status(500).send({msg:error.message})
    }
}
const processRow = async (model, headers, values)  => {
    
        var obj = {};
        headers.forEach((header, i) => obj[header] = values[i]);
        
        if (model === "NetworkNode"){
            
            const new_networkNode = new NetworkNode(obj);
            await new_networkNode.save()
        }
        if (model === "devices"){
            const new_device = new Device(obj);
            await new_device.save()
        }
        if (model === "TagDescriptor"){
            
            let tagdescriptor = new TagDescriptor(obj);
            if (tagdescriptor.tagname){
                tagdescriptor.tagname = tagdescriptor.tagname.toUpperCase()
            }
            const tagdescriptor_validation = await TagDescriptor.find({tagname:tagdescriptor.tagname}).sort({creado:-1})
            if (tagdescriptor_validation.length > 0){
                throw new Error('Ya existe un descriptor con ese tagname'); 
            }

            await tagdescriptor.save();
            
        }
    
}

