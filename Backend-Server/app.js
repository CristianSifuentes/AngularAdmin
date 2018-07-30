//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//inicializar variables
var app = express();

// Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var medicoRoutes = require('./routes/medico');
var hospitalRoutes = require('./routes/hospital');
var loginRoutes = require('./routes/login');


//Conexión con la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDb', (err, rep) => {
    if(err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m','online');

})

//Rutas
app.use('/usuario', usuarioRoutes);
app.use('/medico', medicoRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


//escuchar peticiones
app.listen(3000, () => {

   console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m','online');

});