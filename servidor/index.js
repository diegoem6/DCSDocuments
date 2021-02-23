const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');


//crear el server
const app = express();

//me conecto a la base
conectarDB()

app.use (express.json({extended:true}));
app.use (cors());
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


app.listen (PORT, ()=>{
    console.log(`El server esta levantando en el puerto ${PORT}`)
})