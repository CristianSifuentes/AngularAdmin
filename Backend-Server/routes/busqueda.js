//Requires
var express = require('express');

//inicializar variables
var app = express();

//modelos
var Hospital = require('../models/hospital')
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');

// ruta principal
app.get('/todo/:busqueda', (req, res, next) => {
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');
    
    Promise.all( [ 
        buscarHospitales(busqueda, regex),
        buscarMedicos(busqueda, regex),
        buscarUsuarios(busqueda, regex)
        ])
        .then(respuestas => {

            res.status(200).json({
                 ok: true, 
                 hospitales: respuestas[0],
                 medicos: respuestas[1],
                 usuarios: respuestas[2]
             });

        });

});


function buscarHospitales(busqueda, regex){
   
    return new Promise((resolve, reject) =>{

        Hospital.find({nombre : regex})
          .populate('usuario', 'nombre email')
          .exec((err, hospitales) => {
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

        Medico.find({nombre : regex})
        .populate('usuario', 'nombre email')
        .populate('hospital')
        .exec( (err, medicos) => {
            if(err){
                reject('Error al cargar medicos ', err);
            }else{
                resolve(medicos);
            }
         });

    });
    
}


function buscarUsuarios(busqueda, regex){
   
    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombre emal role')
        .or([{  'nombre': regex }, {  'email': regex }])
        .exec((err, usuarios) => {
            if(err){
                reject('Error al cargar usuarios ', err);
            }else{
                resolve(usuarios);
            }
        });

    });
    
}



module.exports = app;


