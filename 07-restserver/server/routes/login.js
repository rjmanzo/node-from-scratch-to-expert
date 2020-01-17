// load libraries
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const Usuario = require('../models/users');

const app = express()

//GET login
app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: 'false',
                err: err
            })
        }

        //user exist?
        if (!usuarioDB || !body.password) {
            return res.status(400).json({
                ok: 'false',
                err: {
                    message: 'Usuario / Contraseña no validos'
                }
            })
        }

        //Password is correct?
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: 'false',
                err: {
                    message: 'Usuario / Contraseña no validos'
                }
            })
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TIME });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        });

    })
});

//Google authentication
async function verify(token) {
    //console.log('Dentro del verificador de google');
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    //console.log('esta funcando aca!!' + payload.name);

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }

};

app.post('/google', async(req, res) => {

    //console.log(process.env.CLIENT_ID);
    let token = req.body.idtoken;
    //console.log(token);
    let googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                err: e
            });
        });

    //console.log(googleUser);

    //Find the User on the DB
    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        };

        if (usuarioDB) {
            //Ask if that user exist and deppend on the login type
            if (googleUser.email === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Este usuario debe autenticarse con el metodo normal'
                    }
                });
            } else {
                //login the User
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TIME });

                res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token
                });
            }
        } else {
            //The user don't exist on the DB. Need to create a new one
            let usuario = new Usuario();

            usuario.nombre = googleUser.name;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            //dummy password
            usuario.password = ':)';

            //console.log(usuario);
            usuario.save((err, UsuarioDB) => {

                //console.log('llegamos hasta aqui 1');
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err: err
                    });
                };

                //login the User
                let token = jwt.sign({
                    usuario: UsuarioDB
                }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TIME });

                console.log(token);

                res.status(200).json({
                    ok: true,
                    usuario: UsuarioDB,
                    token: token
                });

            });

        }
    });
});

module.exports = app;