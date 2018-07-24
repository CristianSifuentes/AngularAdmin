//Requires
var express = require('express');

//inicializar variables
var app = express();

var Usuario = require('../models/usuario')

// ruta principal
app.get('/', (req, res, next) => {
   
    Usuario.find({  }, (err, usuarios) => {

        if(err){
            res.status(500).json({ ok: false, mensje: 'Error cargando usuarios', errors: err });
        }
        res.status(200).json({ ok: true, usuarios: usuarios });
    });

    res.status(200).json({ ok: true, mensje: 'Get de usuarios' });
});

module.exports = app;


