//Requires
var express = require('express');

//inicializar variables
var app = express();

// ruta principal
app.get('/', (req, res, next) => {
    res.status(200).json({ ok: true, mensje: 'Petición realizada con ´´exito' });
});

module.exports = app;


