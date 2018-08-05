//Requires
var express = require('express');
var fileUpload = require('express-fileupload');

//inicializar variables
var app = express();


// default options
app.use(fileUpload());


// ruta principal
app.put('/', (req, res, next) => {
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
   }else{

   }

    res.status(200).json(
        { 
            ok: true, 
            mensje: 'Petición realizada correctamente',
            extencion: extencionArchivo 
        }
    );});


app.put('/', function(req, res) {
    
    if(!req.files){
        res.status(400).json(
            { 
                ok: false, 
                mensje: 'No seleccionó nada', 
                errors: { message: 'Debe seleccionar una imagen' } 
            }
        );
    }

    res.status(200).json(
        { 
            ok: true, 
            mensje: 'Petición realizada correctamente' 
        }
    );
    
    /*if (!req.files)
      return res.status(400).send('No files were uploaded.');
   
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
   
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
      if (err)
        return res.status(500).send(err);
   
      res.send('File uploaded!');
    });*/
  });



module.exports = app;


