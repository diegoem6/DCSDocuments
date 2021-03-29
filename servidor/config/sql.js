const sql = require ('mssql') //npm i mssql

exports.conectarSQL = async ()=>{
    const sql = require('mssql');
    const config = {
        server: 'localhost',
        database: 'ps_erdb',
        domain: 'DESKTOP-O5VJAUN',
        connectionTimeout: 6000,
        requestTimeout: 6000,
        user: 'db_user',
        password: '1!admin',
        options:{
            instanceName: ''
        },
        pool: {
            max: 16,
            min: 0,
            idleTimeoutMillis: 6000
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
