const TagDescriptor = require('../models/TagDescriptor')
const System = require('../models/System')
const {validationResult} = require('express-validator');
const Entities = require('html-entities').XmlEntities;
const connSQL = require('../config/sql');
const sql = require('mssql');

exports.createTagDescriptor = async (req, res)=>{
    //valido errores
    const errors = validationResult(req);
        
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const {name} = req.body
        let tagdescriptor = new TagDescriptor(req.body);
        if (tagdescriptor.name){
            tagdescriptor.name = name.toUpperCase()
        }
        const tagdescriptor_validation = await TagDescriptor.find({tagname:tagdescriptor.tagname}).sort({creado:-1})
        if (tagdescriptor_validation.length > 0){
            res.status(500).send({msg:'Ya existe un descriptor con ese tagname'})
        }

        await tagdescriptor.save();
        res.json({tagdescriptor});

    } catch (error) {
        console.log(error);
        res.status(500).send({msg:'Hubo un error creando el proyecto'})
    }

}

exports.createDocument = async (req,res)=>{
    try {
        
        const {system} = req.query;
        //existe el asset?
        const system_created_document = await System.findById(system)
        if (!system_created_document){
            console.log("No existe el sistema");
            return res.status(404).send("No existe el sistema")
        }

        const tagsdescriptors = await TagDescriptor.find({system:system_created_document._id}).sort({creado:-1})


        let HtmlDocx = require('html-docx-js');
        let fs = require('fs');

        let inputFile = process.argv[2];
        let outputFile = process.argv[3];

        // fs.readFile(inputFile, 'utf-8', function(err, html) {
        // if (err) throw err;

        let content = `
        <html>
        <head lang="es">
            <meta charset="UTF-8">
        
        <style>
        table{
            width: 100%;
            align-self: center;
            border-spacing: 0;
        }
        table .td{
            text-align: left;
        }
        .header-table{
            // font-weight: 500px;
            // text-align: left;
            // border-bottom: 1pt solid #1a202d;
            background-color:gray;
        }
        tr td {
            /* border-top:0.5pt solid #1a202d;*/
            padding: 1.5rem;
        }
        
        </style>
        </head>
        <body>
        <h1>Tags descriptors del sistema ${system_created_document.name}</h1>
        <br>
        <br>
        `;
        tagsdescriptors.map((tg)=>{
            content = content + "<h1>" + tg.tagname +"</h1><br>"
            content = content + tg.description + "<br><hr><hr>"
        })
        content = content + '</body></html>'
        //content = content.replace("<tbody><tr","<tbody><tr class='header-table'")
        const d = new Date();
        const filename = system_created_document.name + d.getTime()
        

        let docx = HtmlDocx.asBlob(content);
        fs.writeFile(`../tagsdescriptions/public/files/descriptors_${filename}.docx`, docx, function(err) {
            if (err) throw err;
        });
        // const pdf = require('html-pdf');

        // let content = `
        // <h1>Tags descriptors del sistema ${system_created_document.name}</h1>
        // <br>
        // <br>
        // `;
        // tagsdescriptors.map((tg)=>{
        //     content = content + "<h1>" + tg.tagname +"</h1><br>"
        //     content = content + tg.description + "<br><hr><hr>"
        // })
        // pdf.create(content).toFile(`../tagsdescriptions/public/files/descriptors_${system_created_document.name}.pdf`, function(err, res) {
        //     if (err){
        //         return res.status(500).send("Error al crear el documento en PDF")
        //     } else {
        //         console.log(res);
        //     }
        // })
        
        res.json(`descriptors_${filename}.docx`)

    } catch (error) {
        console.log(error);
        res.status(500).send("Error en obtener tagsdescriptors")
        
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
//obteniendo todos los tagsdescriptors quee xisten en la base de datos
exports.getAllTagsDescriptors = async (req,res)=>{
    try {
       const tagsdescriptors = await TagDescriptor.find({}).sort({creado:-1})
       
        res.json({tagsdescriptors})

    } catch (error) {
        console.log(error); 
        res.status(500).send("Error en obtener tagsdescriptors")
        
    }
}
// obteniendo los related

exports.getTagsDescriptors_Related = async (req,res)=>{
    try {
        const tagdescriptor = await TagDescriptor.findById(req.params.id)
        //const tagsDescriptors_related = await TagDescriptor.find({$text: {$search: tagdescriptor.tagname}})
        //tagsDescriptors_related = await TagDescriptor.find({"description":{ $regex: '.*' + tagdescriptor.tagname + '.*' }})
        tagsDescriptors_related = await TagDescriptor.find({"description":{ $regex : new RegExp(tagdescriptor.tagname, "i") } })
        if (tagdescriptor.length === 0){
            res.status(404).send({msg:"No existe el tag descriptor"})
        }else{
            res.json({tagsDescriptors_related})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:"Error en obtener tagsdescriptors"})
        
    }
}

//obteniendo un tagdescriptor
exports.getTagDescriptor = async (req,res)=>{
    try {
        const tagname = req.params.id
        let tagdescriptor = {
            tagname:'',
            description:'',
            tagsDescriptors_related:[]
        }
        let tagdescriptor_temp = await TagDescriptor.find({"tagname":tagname.toUpperCase()}).sort({creado:-1})
        const entities = new Entities()
        tagdescriptor_temp[0].description = entities.encodeNonUTF(tagdescriptor_temp[0].description)
        tagdescriptor.tagname = tagdescriptor_temp[0].tagname;
        tagdescriptor.description = tagdescriptor_temp[0].description;
        tagdescriptor._id = tagdescriptor_temp[0]._id;

        const tagsDescriptors_related = await TagDescriptor.find({"description":{ $regex : new RegExp(tagdescriptor_temp[0].tagname, "i") } })
        //console.log(tagsDescriptors_related)
        tagdescriptor.tagsDescriptors_related = tagsDescriptors_related;
        tagdescriptor_temp[0].tagsDescriptors_related = tagsDescriptors_related;
        if (tagdescriptor_temp.length === 0){
            res.status(404).send({msg:"No existe el tag descriptor"})
        }else{
            res.json({tagdescriptor})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:"Error en obtener tagsdescriptors"})
        
    }
}

//obteniendo un tagdescriptor
exports.getTagDescriptorsBySystem = async (req,res)=>{
    try {

        const system_name = req.params.id
        const system = await System.find({name:system_name})
        if (!system){
            res.status(404).send({msg:"No existe el sistema"})
        }
        const tagdescriptors = await TagDescriptor.find({system:system[0]._id}).sort({creado:-1})
        const entities = new Entities()
        tagdescriptors.map (
            tg => {
                tg.description= entities.encodeNonUTF(tg.description)
            }
        )
        res.json({tagdescriptors})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:"Error en obtener tagsdescriptors"})
        
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
    const newTagDescriptor = {};
    if (tagname){
        newTagDescriptor.tagname=tagname.toUpperCase();
    }
    if (description){
        newTagDescriptor.description=description;
    }
    try {
       
        //revisar el id
        const idTagDescriptor = req.params.id
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

//request.query(`select StringValue from STRATEGY_PARAM_VALUE where StrategyID = ${TAG} and (ParamID like '44705' 
//    or ParamID like '44706')`)

exports.getInterlock = async (req, res)=>{
    let resp, StID, IOC, EEC;
    const json_error = [{"Interlock": "No hay interlocks"},{"Interlock": ""}]
    resp = json_error;
    
    try {
        
        //const TAG='251_42_030';
        
        const idTagDescriptor = req.params.id
        const tag_descriptor = await TagDescriptor.findById(idTagDescriptor)
            // console.log(tag_descriptor.tagname)
        if (!tag_descriptor){
            console.log("No existe el tag descriptor");
            return res.status(404).send("No existe el tag descriptor")
        }
        const TAG=tag_descriptor.tagname

        const servidor = findServer(TAG);
        //servidor='localhost';
        //console.log('El server es:', servidor);
        const conn = await connSQL.conectarSQL(servidor);
        let pool = await conn.connect();
        
        resp = await pool.request()
            .query(`select IOC,EEC from STRATEGY where StrategyName = '${TAG}_INT' and StrategyID<0`)
        if (!resp.recordset[0]){
            resp = json_error;
            res.json({resp});
            conn.close();
            return;
        }    
        IOC = resp.recordset[0].IOC
        EEC = resp.recordset[0].EEC
        
        resp = await pool.request()
            .query(`select top 1 StrategyID as StID from STRATEGY where StrategyName = 'CATCHER' and IOC=${IOC} and EEC=${EEC} and StrategyID<0`)
        
        if (!resp.recordset[0]){
            resp = json_error;
            res.json({resp});
            conn.close();
            return;
        }
        StID=resp.recordset[0].StID;
        resp = await pool.request()
        .query(`select spv.StringValue as Interlock from PARAM_DEF as pd inner join TEMPLATE as t on pd.TemplateID=t.TemplateID and t.TemplateName='FirstOut' and pd.ParamName like 'INDESC%'
        inner join STRATEGY_PARAM_VALUE as spv on spv.ParamID=pd.ParamID and spv.StrategyID = ${StID}`)
        
        resp =  resp.recordset;
        res.json({resp});
        conn.close();
        return;

     } catch (error) {
         console.log(error);
         res.status(500).send("Error al visualizar los interlocks")
     }
}


exports.getAlarmasyEventos = async (req, res)=>{
    //console.log('Desde getAlarmasyEventos del servidor')
    let resp, StID;
    const json_error = [{"Alarmas y Eventos": "No hay alarmas y eventos"}]
    resp = json_error;
    
    try {
        
        const idTagDescriptor = req.params.id
        const tag_descriptor = await TagDescriptor.findById(idTagDescriptor)
        //console.log(tag_descriptor.tagname)
        if (!tag_descriptor){
            console.log("No existe el tag descriptor");
            return res.status(404).send("No existe el tag descriptor")
        }
        let TAG=tag_descriptor.tagname
        //TAG='NDM'
        const servidor = findServer(TAG);
        //servidor='localhost';
        //console.log('El server es:', servidor);
        
        const conn = await connSQL.conectarSQL(servidor);
        //const conn = await connSQL.conectarSQL('localhost');
        let pool = await conn.connect();
        resp = await pool.request()
            /*.query(`SELECT AreaName, Source AS Tagname, Block, AlarmLimit, ConditionName, Description, Action, Priority, Actor, Value, [EMSEvents].dbo.UTCFILETIMEToDateTime(LocalTime) as Fecha FROM [EMSEvents].dbo.Events where Source like '${TAG}'
            AND dbo.UTCFILETIMEToDateTime(LocalTime) >= DATEADD(day, -1, GETDATE())`)*/
            .query(`SELECT top 1000 AreaName, Source AS Tagname, Block, AlarmLimit, ConditionName, Description, Action, Priority, Actor, Value, [EMSEvents].dbo.UTCFILETIMEToDateTime(LocalTime) as Fecha FROM [EMSEvents].dbo.Events where Source like '${TAG}' order by localtime desc`)
        //console.log (`SELECT AreaName, Source AS Tagname, Block, AlarmLimit, ConditionName, Description, Action, Priority, Actor, Value, [EMSEvents].dbo.UTCFILETIMEToDateTime(LocalTime) as Fecha FROM [EMSEvents].dbo.Events where Source like '${TAG}'`)        
        //console.log(resp)    
        if (!resp.recordset[0]){
            resp = json_error;
            res.json({resp});
            conn.close();
            return;
        }
        resp =  resp.recordset;
        res.json({resp});
        
        conn.close();
        return;
        
     } catch (error) {
         console.log(error);
         res.status(500).send("Error al visualizar las alarmas y eventos")
     }
}



const findServer=(TAG) => {
    const area=parseInt(TAG.substring(0, 3),10);
    let servidor;
    if ((area<200) || (area==403) || (area==402) || (area==600)){
        //console.log('PMCLS001');
        return ('10.11.2.101');
    }
    else if ((area<250) && (area>=200)){
        //console.log('PMCLS005');
        return ('10.11.2.114');
    }
    else if (area>250){
        //console.log('PMCLS006');
        return ('10.11.2.109');        
    }
    else{
        return;    
    }
}
