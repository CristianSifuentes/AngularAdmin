//Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var app = express();
var Usuario = require('../models/usuario');
var mdAutenticacion = require('../middlewares/autenticacion')


// =============================================
// Obtener todos los usuarios
// =============================================
app.get('/', (req, res, next) => {
   

     var desde = req.query.desde || 0;
     desde = Number(desde);

     Usuario.find({}, 'nombre email img role')
         .skip(desde)
         .limit(5)
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
                Usuario.count({ }, (err, conteo) =>{
                    res.status(200).json({ ok: true, usuarios: usuarios, total: conteo });
                });
               
     });
});


// =============================================
// Actualizar un nuevo usuario
// =============================================
app.put('/:id',  mdAutenticacion.verificaToken, (req, res, next) => {
  
  var id = req.params.id;
  var body = req.body;


  Usuario.findById(id, (err, usuario) => {

        if(err){
            return res.status(500).json({ 
                    ok: false, 
                    mensje: 'Error al obtener el usuario', 
                    errors: err 
           });
        }

        if(!usuario){
            return res.status(400).json({ 
                ok: false, 
                mensje: 'El usuario  con el id ' + id +' no existe', 
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }
        
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save(( err, usuarioGuardado) => {
           
            if(err){
                return res.status(400).json({ 
                        ok: false, 
                        mensje: 'Error al actualizar el usuario', 
                        errors: err 
               });
            }

            usuarioGuardado.password = ':)';
            res.status(200).json({ ok: true, usuario: usuarioGuardado });

        });
  });
});



// =============================================
// Crear un nuevo usuario
// =============================================
app.post('/', (req, res, next) => {
   
    var body = req.body;

    var usuario = new Usuario({
        nombre : body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role

    });

    usuario.save((err, usuarioGuardado) => {
        if(err){
            res.status(400).json(
                { 
                    ok: false, 
                    mensje: 'Error al crear usuario', 
                    errors: err 
                }
            );
        }

        res.status(201).json({ ok: true, usuario: usuarioGuardado, usuarioToken : req.usuario });
    });

});



// =============================================
// Eliminar un nuevo usuario
// =============================================
app.delete('/:id',  mdAutenticacion.verificaToken, (req, res, next) => {
   
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        
        if(err){
            res.status(500).json(
                { 
                    ok: false, 
                    mensje: 'Error al borrar usuario', 
                    errors: err 
                }
            );
        }

        if(!usuarioBorrado){
            return res.status(400).json({ 
                ok: false, 
                mensje: 'El usuario  con el id ' + id +' no existe', 
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        res.status(200).json({ ok: true, usuario: usuarioBorrado });
    });


});


module.exports = app;


