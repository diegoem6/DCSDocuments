const sql = require ('mssql') //npm i mssql

exports.conectarSQL = async ()=>{
    const sql = require('mssql');
    const config = {
        server: 'localhost',
        database: 'ps_erdb',
        domain: 'NAMERICA1',
        user: 'E552770',
        password: 'Honeywell36',
        options:{
            instanceName: 'SQLEXPRESS'
        }
    }
    try{
        const conn = new sql.ConnectionPool(config);
        return (conn)
    }
    catch{
        console.log("FALLO LA CONEXIÓN")
        return('Fallo conexion');
    }
        
}

//module.exports = conectarSQL;
