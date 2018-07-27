var express = require('express');
var bcrypt = require('bcryptjs');
var app = express();
var Usuario = require('../models/usuario');


app.post('/', (req, res) => {
    var body = req.body;
    
    Usuario.findOne({ email: body.email }, (err, usuarioDb) => {
       
        if(err){
            return res.status(500).json({ 
                    ok: false, 
                    mensje: 'Error al buscar usuarios', 
                    errors: err 
           });
        }
        
        if(!usuarioDb){
            return res.status(400).json({ 
                ok: false, 
                mensje: 'Credenciales incorrectas - email', 
                errors: err 
            });
        }

        if(!bcrypt.compareSync(body.password, usuarioDb.password)){
            return res.status(400).json({ 
                ok: false, 
                mensje: 'Credenciales incorrectas - password', 
                errors: err 
            });
        }

        // Crear un token


        res.status(200).json({ ok: true, usuario: usuarioDb, id: usuarioDb.id });

    });
});



module.exports = app;