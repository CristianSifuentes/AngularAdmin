//Requires
var express = require('express');


//inicializar variables
var app = express();



//escuchar peticiones
app.listen(3000, () => {

   console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m','online');

});