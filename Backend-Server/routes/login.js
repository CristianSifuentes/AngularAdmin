var express = require('express');
var bcrypt = require('bcryptjs');
var app = express();
var Usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

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

        usuarioDb.password = "=)";
        // Crear un token     //payload            
        var token = jwt.sign({ usuario: usuarioDb}, SEED, { expiresIn: 14400 })

        res.status(200).json({ ok: true, usuario: usuarioDb, token: token, id: usuarioDb.id });

    });
});



module.exports = app;