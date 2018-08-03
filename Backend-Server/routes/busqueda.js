//Requires
var express = require('express');

//inicializar variables
var app = express();

//modelos
var Hospital = require('../models/hospital')

// ruta principal
app.get('/todo/:busqueda', (req, res, next) => {
    var busqueda = req.params.busqueda;

    Hospital.find({nombre : /norte/i}, (err, hospitales) => {
        res.status(200).json({ ok: true, mensje: 'Petición realizada con éxito' });

    });

});

module.exports = app;


