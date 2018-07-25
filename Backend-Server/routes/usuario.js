//Requires
var express = require('express');

//inicializar variables
var app = express();

var Usuario = require('../models/usuario')

// ruta principal
app.get('/', (req, res, next) => {
   
     Usuario.find({}, 'nombre email img role')
         .exec(    
                (err, usuarios) => {
                if(err){
                    res.status(500).json(
                        { 
                            ok: false, 
                            mensje: 'Error cargando usuarios', 
                            errors: err 
                        }
                    );
                }
                res.status(200).json({ ok: true, usuarios: usuarios });
     });
});

module.exports = app;


