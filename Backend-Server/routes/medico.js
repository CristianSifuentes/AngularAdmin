//Requires
var express = require('express');
var app = express();
var Medico = require('../models/medico');
var mdAutenticacion = require('../middlewares/autenticacion')

// =============================================
// Obtener todos los Medicos
// =============================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);
   
     Medico.find({})
        .skip(desde)
        .limit(5)
         .populate('usuario', 'nombre email')
         .populate('hospital')
         .exec(    
                (err, Medicos) => {
                if(err){
                    res.status(500).json(
                        { 
                            ok: false, 
                            mensje: 'Error cargando Medicos', 
                            errors: err 
                        }
                    );
                }
                Medico.count({ }, (err, conteo) =>{
                    res.status(200).json({ ok: true, Medicos: Medicos, total: conteo });
                });
     });
});


// =============================================
// Actualizar un nuevo Medico
// =============================================
app.put('/:id',  mdAutenticacion.verificaToken, (req, res, next) => {
  
  var id = req.params.id;
  var body = req.body;


  Medico.findById(id, (err, Medico) => {

        if(err){
            return res.status(500).json({ 
                    ok: false, 
                    mensje: 'Error al obtener el Medico', 
                    errors: err 
           });
        }

        if(!Medico){
            return res.status(400).json({ 
                ok: false, 
                mensje: 'El Medico  con el id ' + id +' no existe', 
                errors: { message: 'No existe un Medico con ese ID' }
            });
        }
        
        //nombre, img, usuario, hospital
        Medico.nombre = body.nombre;
        Medico.img = body.img;
        Medico.usuario = body.usuario;
        Medico.hospital = body.hospital;

        Medico.save(( err, MedicoGuardado) => {
           
            if(err){
                return res.status(400).json({ 
                        ok: false, 
                        mensje: 'Error al actualizar el Medico', 
                        errors: err 
               });
            }
            res.status(200).json({ ok: true, Medico: MedicoGuardado });

        });
  });
});



// =============================================
// Crear un nuevo Medico
// =============================================
app.post('/',  mdAutenticacion.verificaToken ,  (req, res, next) => {
   
    var body = req.body;
    //nombre, img, usuario, hospital
    var medico = new Medico({
        nombre : body.nombre,
        usuario: req.usuario._id, 
        hospital: body.hospital
    });

    medico.save((err, MedicoGuardado) => {
        if(err){
            res.status(400).json(
                { 
                    ok: false, 
                    mensje: 'Error al crear Medico', 
                    errors: err 
                }
            );
        }

        res.status(201).json({ ok: true, Medico: MedicoGuardado, MedicoToken : req.Medico });
    });



});



// =============================================
// Eliminar un nuevo Medico
// =============================================
app.delete('/:id',  mdAutenticacion.verificaToken, (req, res, next) => {
   
    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, MedicoBorrado) => {
        
        if(err){
            res.status(500).json(
                { 
                    ok: false, 
                    mensje: 'Error al borrar Medico', 
                    errors: err 
                }
            );
        }

        if(!MedicoBorrado){
            return res.status(400).json({ 
                ok: false, 
                mensje: 'El Medico  con el id ' + id +' no existe', 
                errors: { message: 'No existe un Medico con ese ID' }
            });
        }

        res.status(200).json({ ok: true, Medico: MedicoBorrado });
    });


});


module.exports = app;


