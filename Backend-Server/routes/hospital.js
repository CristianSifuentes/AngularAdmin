//Requires
var express = require('express');
var app = express();
var Hospital = require('../models/hospital');
var mdAutenticacion = require('../middlewares/autenticacion')

// =============================================
// Obtener todos los Hospitales
// =============================================
app.get('/', (req, res, next) => {
   
     Hospital.find({})
         .exec(    
                (err, Hospitales) => {
                if(err){
                    res.status(500).json(
                        { 
                            ok: false, 
                            mensje: 'Error cargando Hospitales', 
                            errors: err 
                        }
                    );
                }
                res.status(200).json({ ok: true, Hospitales: Hospitales });
     });
});


// =============================================
// Actualizar un nuevo Hospital
// =============================================
app.put('/:id',  mdAutenticacion.verificaToken, (req, res, next) => {
  
  var id = req.params.id;
  var body = req.body;


  Hospital.findById(id, (err, Hospital) => {

        if(err){
            return res.status(500).json({ 
                    ok: false, 
                    mensje: 'Error al obtener el Hospital', 
                    errors: err 
           });
        }

        if(!Hospital){
            return res.status(400).json({ 
                ok: false, 
                mensje: 'El Hospital  con el id ' + id +' no existe', 
                errors: { message: 'No existe un Hospital con ese ID' }
            });
        }
        
        Hospital.nombre = body.nombre;
        Hospital.usuario = body.usuario;

        Hospital.save(( err, HospitalGuardado) => {
           
            if(err){
                return res.status(400).json({ 
                        ok: false, 
                        mensje: 'Error al actualizar el Hospital', 
                        errors: err 
               });
            }
            res.status(200).json({ ok: true, Hospital: HospitalGuardado });

        });
  });
});



// =============================================
// Crear un nuevo Hospital
// =============================================
app.post('/',  mdAutenticacion.verificaToken ,  (req, res, next) => {
   
   var body = req.body;
    
    var hospital = new Hospital({
        nombre : body.nombre,
        usuario: req.usuario._id
    });

    hospital.save((err, HospitalGuardado) => {
        if(err){
            res.status(400).json(
                { 
                    ok: false, 
                    mensje: 'Error al crear Hospital', 
                    errors: err 
                }
            );
        }

        res.status(201).json({ ok: true, Hospital: HospitalGuardado, HospitalToken : req.Hospital });
    });


});



// =============================================
// Eliminar un nuevo Hospital
// =============================================
app.delete('/:id',  mdAutenticacion.verificaToken, (req, res, next) => {
   
    var id = req.params.id;

    Hospital.findByIdAndRemove(id, (err, HospitalBorrado) => {
        
        if(err){
            res.status(500).json(
                { 
                    ok: false, 
                    mensje: 'Error al borrar Hospital', 
                    errors: err 
                }
            );
        }

        if(!HospitalBorrado){
            return res.status(400).json({ 
                ok: false, 
                mensje: 'El Hospital  con el id ' + id +' no existe', 
                errors: { message: 'No existe un Hospital con ese ID' }
            });
        }

        res.status(200).json({ ok: true, Hospital: HospitalBorrado });
    });


});


module.exports = app;


