const sql = require ('mssql') //npm i mssql

exports.conectarSQL = async (servidor)=>{
    const sql = require('mssql');
    //console.log('El servidor desde SQL es',servidor);
    const config = {
        /*server: servidor, //'localhost',
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
        }*/
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
