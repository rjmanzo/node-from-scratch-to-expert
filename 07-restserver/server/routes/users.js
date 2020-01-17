// load libraries
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/users');

const { tokenauthentication, adminRoleAuthorization } = require('../middlewares/authentification');

const app = express()

//GET user
app.get('/usuario', tokenauthentication, (req, res) => {


    //Define filter conditions
    let filtering = {
        estado: true
    }

    //Define pagination from and limit
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limte || 0;
    limite = Number(limite);

    //Define the list and the order of the parameters to return on the response using the second argument of the method Find
    Usuario.find(filtering, 'role nombre estado google email img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: 'false',
                    err: err
                })
            }

            Usuario.estimatedDocumentCount(filtering, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios: usuarios,
                    cuantos: conteo
                });

            })

        });

})

//POST user
app.post('/usuario', [tokenauthentication, adminRoleAuthorization], (req, res) => {
    //load the body data from the Request
    let body = req.body;

    //asign new User to be created
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    //insert and recive respond from DB
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: 'false',
                err: err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })
});

//UPSERT User
app.put('/usuario/:id', [tokenauthentication, adminRoleAuthorization], (req, res) => {

    let id = req.params.id;

    //let body = req.body;
    //filter the list of field to be updating using the put method
    let body = _.pick(req.body, ['nombre', 'emai', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: 'false',
                err: err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })
});

//Delete User
app.delete('/usuario/:id', [tokenauthentication, adminRoleAuthorization], (req, res) => {

    let id = req.params.id;

    let estadoNuevo = {
        estado: false
    }

    //Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, estadoNuevo, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: 'false',
                err: err
            })
        }

        //Ask if the user is already deleted
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: 'false',
                err: {
                    message: 'Usuario no encontrado'
                }
            })

        }
        //delte the user from the DB
        return res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    })
});

module.exports = app;