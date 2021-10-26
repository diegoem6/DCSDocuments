const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs')
const readXlsxFile = require('read-excel-file/node')
const NetworkNode = require('../models/NetworkNode');
const TagDescriptor = require('../models/TagDescriptor')

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

exports.processFile = async(req, res, next)=>{
    try {
        upload(req, res, async(error)=>{
            //console.log(req.file)
            if(!error){
                console.log(req.file.filename)
                readXlsxFile('../servidor/files/file_to_process.xls', { sheet: 1 }).then((data) => {
                    const model = data[0][1]
                    const fields = data[1][1]
                    readXlsxFile('../servidor/files/file_to_process.xls', { sheet: 2 }).then((data) => {
                        let headers = true
                        for (const row in data) {  
                            if (headers){
                                headers = false;
                            } else{
                                processRow (model, data[0], data[row])
                            }
                            
                        }
                    })

                })
                
            }else{
                console.log(error);
                return next();
            }
        })
        


        
    } 
    catch (error) {
        console.log(error)
        res.status(500).send({msg:"Hubo un error al subir el archivo"})
    }
}

const processRow = async (model, headers, values)  => {
    var obj = {};
    headers.forEach((header, i) => obj[header] = values[i]);
    console.log(obj);
    
    if (model = "NetworkNode"){
        
        const new_networkNode = new NetworkNode(obj);
        await new_networkNode.save()
    }
    if (model = "TagDescriptor"){
        
        let tagdescriptor = new TagDescriptor(obj);
        if (tagdescriptor.tagname){
            tagdescriptor.tagname = tagdescriptor.tagname.toUpperCase()
        }
        const tagdescriptor_validation = await TagDescriptor.find({tagname:tagdescriptor.tagname}).sort({creado:-1})
        if (tagdescriptor_validation.length > 0){
            res.status(500).send({msg:'Ya existe un descriptor con ese tagname'})
        }

        await tagdescriptor.save();
    }
}
