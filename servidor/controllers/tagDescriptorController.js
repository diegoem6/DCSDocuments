const TagDescriptor = require('../models/TagDescriptor')
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
        const tagsdescriptors = await TagDescriptor.find()
        res.json({tagsdescriptors});
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
    const {tagname, descriptor} = req.body
    const newTagDescriptor = {};
    if (tagname){
        newTagDescriptor.tagname=tagname;
    }
    if (descriptor){
        newTagDescriptor.descriptor=descriptor;
    }

    try {
       
        //revisar el id
        const idTagDescriptor = req.params.id

        //existe el proyecto?
        let tag_descriptor_modified = await Proyecto.findById(idTagDescriptor)
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
        tag_descriptor_deleted = await Proyecto.findOneAndRemove({_id:id});
        res.json({msg: 'Tag descriptor eliminado'})
 
 
     } catch (error) {
         console.log(error);
         res.status(500).send("Error en eliminar el tag descriptor")
     }
}