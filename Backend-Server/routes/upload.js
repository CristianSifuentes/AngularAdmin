//Requires
var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
//inicializar variables
var app = express();

var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');

// default options
app.use(fileUpload());


// ruta principal
app.put('/:tipo/:id', (req, res, next) => {
   
   
    var tipo = req.params.tipo;
    var id = req.params.id;

   //tipos de coleccion 
   var tiposValidos = ['hospitales', 'medicos', 'usuarios'];
   if(tiposValidos.indexOf(tipo) < 0){
            return res.status(400).json(
                { 
                    ok: false, 
                    mensje: 'Tipo de colección no es válida', 
                    errors: { message: 'Tipo de colección no es válida' } 
                }
            );
    }




   
    if(!req.files){
        return res.status(400).json(
            { 
                ok: false, 
                mensje: 'No seleccionó nada', 
                errors: { message: 'Debe seleccionar una imagen' } 
            }
        );
    }

   var archivo = req.files.imagen;
   var nombreCortado = archivo.name.split('.'); 
   var extencionArchivo = nombreCortado[nombreCortado.length - 1];


   //Solo estas extensiones aceptamos
   var extensionesValidas  = ['png', 'jpg', 'gif', 'jpg'];
   if(extensionesValidas.indexOf(extencionArchivo) < 0){
        return res.status(400).json(
            { 
                ok: false, 
                mensje: 'Extension no válida', 
                errors: { message: 'Las extensiones válidas son '  + extensionesValidas.join(', ') } 
            }
        );
   }


   //Nombre archivo
   var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extencionArchivo }`;

   //Mover el archivo del temporal a un path
   var path = `./uploads/${ tipo }/${ nombreArchivo }`;

   archivo.mv(path, err => {
       if(err){
            return res.status(400).json(
                { 
                    ok: false, 
                    mensje: 'Error al mover archovo', 
                    errors: err       
                
                }
            );
       }

   });

   subirPorTipo(tipo, id, nombreArchivo, res);



});




function subirPorTipo(tipo, id, nombreArchivo, res){
    if(tipo === 'usuario'){
       Usuario.findById(id, (err, usuario) => {
           var pathBefore = './uploads/usuarios/' + usuario.img;
        
           //Si existe elimina la imagen anterior
           if(fs.existsSync(pathBefore)){
               fs.unlink(pathBefore);
           }

           usuario.img = nombreArchivo;
           usuario.save((err, usuarioActualizado) => {

                    if(err){
                        return  res.status(500).json({ 
                                    ok: false, 
                                    mensje: 'Imagen de usuario no se ha podido actualizar'                    
                                });
                    }

                    return  res.status(200).json({ 
                            ok: true, 
                            mensje: 'Imagen de usuario actualizada',
                            usuario: usuarioActualizado 
                    });
           });
       
        });
    }
    if(tipo === 'medicos'){
       
    }
    if(tipo === 'hospitales'){
        
    }
}



module.exports = app;


