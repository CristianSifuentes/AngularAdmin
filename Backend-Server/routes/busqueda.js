//Requires
var express = require('express');

//inicializar variables
var app = express();

//modelos
var Hospital = require('../models/hospital')
var Medico = require('../models/medico');
// ruta principal
app.get('/todo/:busqueda', (req, res, next) => {
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');
    
    Promise.all( [ 
        buscarHospitales(busqueda, regex),
        buscarMedicos(busqueda, regex) ])
        .then(respuestas => {
            res.status(200).json({
                 ok: true, 
                 hospitales: respuestas[0],
                 medicos: respuestas[1]
             });

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


function buscarMedicos(busqueda, regex){
   
    return new Promise((resolve, reject) =>{

        Medico.find({nombre : regex}, (err, medicos) => {
            if(err){
                reject('Error al cargar medicos ', err);
            }else{
                resolve(medicos);
            }
         });

    });
    
}


module.exports = app;


