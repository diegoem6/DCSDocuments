const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
require('dotenv').config({path: 'variables.env'});

//crear el server
const app = express();
console.log(process.env.PORT);
//me conecto a la base
conectarDB()
console.log("conectado a la base de datos")

app.use(express.json());
app.use(cors());


app.use(express.static('cabinetsFiles')); //la carpeta publica del servidor
// seteo el puerto donde levanta el server != de 3000
const PORT = process.env.PORT || 4001;

//importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/authAD', require('./routes/authAD'));
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
app.use('/api/connections', require('./routes/connections'));
app.use('/api/cabinets', require('./routes/cabinets'));
app.use('/api/cabinetfiles', require('./routes/cabinetfiles'));
app.use('/api/iocards', require('./routes/iocards'));
app.use('/api/analytics', require('./routes/analytics'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal!' });
});

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});

 