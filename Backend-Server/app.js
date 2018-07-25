//Requires
var express = require('express');
var mongoose = require('mongoose');

//inicializar variables
var app = express();

//importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');


//Conexión con la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDb', (err, rep) => {
    if(err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m','online');

})

//Rutas
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);


//escuchar peticiones
app.listen(3000, () => {

   console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m','online');

});