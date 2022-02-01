const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//crear el server
const app = express();

//me conecto a la base
conectarDB()

app.use (express.json({extended:true}));
app.use (cors());


app.use(express.static('public'));
// seteo el puerto donde levanta el server != de 3000
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/assets', require('./routes/assets'));
app.use('/api/tagsdescriptors', require('./routes/tagsdescriptors'));
app.use('/api/systems', require('./routes/systems'));
app.use('/api/tree', require('./routes/tree'));
app.use('/api/showtag', require('./routes/showtag'));
app.use('/api/showtags', require('./routes/showtags'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/interlocks', require('./routes/interlocks'));
app.use('/api/alarmasyeventos', require('./routes/alarmasyeventos'));
app.use('/api/network', require('./routes/network'));
app.use('/api/networkmodels', require('./routes/networkmodels'));
app.use('/api/networkShow', require('./routes/networkShow'));
app.use('/api/devices', require('./routes/devices'));
app.use('/api/devicestypes', require('./routes/devicestypes'));
app.use('/api/files', require('./routes/files'));
app.use('/api/areas', require('./routes/areas'));
app.use('/api/architecture', require('./routes/architecture'));

app.listen (PORT, ()=>{
    console.log(`El server esta levantando en el puerto ${PORT}`)
})

