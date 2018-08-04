//Requires
var express = require('express');

//inicializar variables
var app = express();

//modelos
var Hospital = require('../models/hospital')
var Medicos = require('../models/medico');
// ruta principal
app.get('/todo/:busqueda', (req, res, next) => {
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    buscarHospitales(busqueda, regex) 
        .then(hospitales => {
            res.status(200).json({ ok: true, hospitales: hospitales });

        });

});


function buscarHospitales(busqueda, regex){
   
    return new Promise((resolve, reject) =>{

        Hospital.find({nombre : regex}, (err, hospitales) => {
            if(err){
                reject('Error al cargar hospitales', err);
            }else{
                resolve(hospitales);
            }
         });

    });
    
}


module.exports = app;


