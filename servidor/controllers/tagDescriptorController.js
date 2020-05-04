const TagDescriptor = require('../models/TagDescriptor')
const System = require('../models/System')
const {validationResult} = require('express-validator');


exports.createTagDescriptor = async (req, res)=>{
    //valido errores
    const errors = validationResult(req);
        
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const tagdescriptor = new TagDescriptor(req.body);
        tagdescriptor.save();
        res.send(tagdescriptor);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error creando el proyecto')
    }

}

//obteniendo todos los tagsdescriptors
exports.getTagsDescriptors = async (req,res)=>{
    try {
        
        const {system} = req.query;
        //existe el asset?
        const system_updated = await System.findById(system)
        if (!system_updated){
            console.log("No existe el sistema");
            return res.status(404).send("No existe el sistema")
        }

        const tagsdescriptors = await TagDescriptor.find({system:system_updated._id}).sort({creado:-1})
        res.json({tagsdescriptors})

    } catch (error) {
        console.log(error);
        res.status(500).send("Error en obtener tagsdescriptors")
        
    }
}

//obteniendo un tagdescriptor
exports.getTagDescriptor = async (req,res)=>{
    try {
        const tagname = req.params.id

        const tagdescriptor = await TagDescriptor.find({tagname:tagname}).sort({creado:-1})
        if (tagdescriptor.length === 0){
            
            res.status(500).send("No existe el tag descriptor")
        }else{
            res.json({tagdescriptor})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en obtener tagsdescriptors")
        
    }
}

exports.updateTagDescriptor = async (req, res)=>{
    //valido errores
    const errors = validationResult(req);
        
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    // extraer la información del proyecto
    const {tagname, description} = req.body
    console.log(req.body)
    const newTagDescriptor = {};
    if (tagname){
        newTagDescriptor.tagname=tagname;
    }
    if (description){
        newTagDescriptor.description=description;
    }
    console.log(newTagDescriptor)
    try {
       
        //revisar el id
        const idTagDescriptor = req.params.id
        console.log(idTagDescriptor)
        //existe el proyecto?
        let tag_descriptor_modified = await TagDescriptor.findById(idTagDescriptor)
        if (!tag_descriptor_modified){
            console.log("No existe el tag descriptor");
            return res.status(404).send("No existe el tag descriptor")
        }

       //actualizar 
       tag_descriptor_modified = await TagDescriptor.findByIdAndUpdate({_id:idTagDescriptor},{$set:newTagDescriptor},{new:true});
       res.json({tag_descriptor_modified})


    } catch (error) {
        console.log(error);
        res.status(500).send("Error en actualizar el tag descriptor")
    }
}

exports.deleteTagDescriptor = async (req, res)=>{
    try {
       
        //revisar el id
         const id = req.params.id
        //existe el proyecto?
         let tag_descriptor_deleted = await TagDescriptor.findById(id)
         if (!tag_descriptor_deleted){
             console.log("No existe el tag descriptor a eliminar");
             return res.status(404).send("No existe el tag descriptor a eliminar")
         }
 
        //actualizar 
        tag_descriptor_deleted = await TagDescriptor.findOneAndRemove({_id:id});
        res.json({msg: 'Tag descriptor eliminado'})
 
 
     } catch (error) {
         console.log(error);
         res.status(500).send("Error en eliminar el tag descriptor")
     }
}