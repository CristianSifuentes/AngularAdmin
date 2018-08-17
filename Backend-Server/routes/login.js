
var express = require('express');
var bcrypt = require('bcryptjs');
var app = express();
var Usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

//Google
var CLIENT_ID = require('../config/config').CLIENT_ID;
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


//=============================================0
// Autenticación por google
//=============================================0

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,
        payload 
    }

}



app.post('/google', async (req, res) =>{

    var token = req.body.token;

    var googleUser = await verify(token).catch(e => {
        return res.status(403).json({ 
            ok: false, 
            mensje: 'Token no válido'
         });
    });


    Usuario.findOne({email: googleUser.email}, (err, usuarioDB) => {


        if(err){
            return res.status(500).json({ 
                    ok: false, 
                    mensje: 'Error obtener el usuario', 
                    errors: err 
           });
        }
        
        if(usuarioDB) {

            if(usuarioDB.google === false) {
                return res.status(400).json({ 
                    ok: false, 
                    mensje: 'Debe hacer su autenticación normal'
              });
            } else {
                var token = jwt.sign({ usuario: usuarioDb}, SEED, { expiresIn: 14400 })
                res.status(200).json({ ok: true, usuario: usuarioDb, token: token, id: usuarioDb.id });
            }
        }
        else {
           //El usuario no existe hay que crearlo
           var usuario = new Usuario();
           usuario.email = googleUser.email;
           usuario.nombre = googleUser.nombre;
           usuario.img = googleUser.img;
           usuario.google = true;
           usuario.password = '=)';

           usuario.save((err, usuario) => {

                    if(err){
                        return res.status(500).json({ 
                                ok: false, 
                                mensje: 'Error insertar el usuario desde google', 
                                errors: err 
                        });
                    }

                    var token = jwt.sign({ usuario: usuario}, SEED, { expiresIn: 14400 })
                    res.status(200).json({ ok: true, usuario: usuario, token: token, id: usuario.id });
           });

        }   

    });
});


//=============================================0
// Autenticación normal
//=============================================0
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