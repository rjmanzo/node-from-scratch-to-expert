const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

let Categoria = require('../models/category');

const { tokenauthentication, adminRoleAuthorization } = require('../middlewares/authentification');

const app = express()

//GET
app.get('/categoria', tokenauthentication, (req, res) => {


    Categoria.find()
        .exec((err, categoria) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                })
            }

            return res.status(200).json({
                ok: true,
                categoria: categoria

            });

        })

});
//GET by ID
app.get('/categoria/:id', tokenauthentication, (req, res) => {

    let id = req.params.id;
    //let id = tokenauthentication.usuario._id;

    Categoria.findById(id)
        .exec((err, categoria) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                })
            }

            res.status(200).json({
                ok: true,
                categoria: categoria

            });

        })

});
//POST
app.post('/categoria', tokenauthentication, (req, res) => {
    let body = req.body;
    //let id = req.usuario._id;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    //console.log(categoria);

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: err
            });

        } else {

            res.status(201).json({
                ok: true,
                categoria: categoriaDB
            });
        }
    });

});
//UPDATE
app.put('/categoria/:id', [tokenauthentication, adminRoleAuthorization], (req, res) => {

    let idf = req.params.id;
    let body = _.pick(req.body, ['descripcion']);

    Categoria.findByIdAndUpdate(idf, body, { new: true }, (err, categoriaDB) => {

        if (err) {
            console.log(categoriaDB);
            return res.status(500).json({
                ok: 'false',
                err: err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    })
});

//DELETE (FROM db)
app.delete('/categoria/:id', [tokenauthentication, adminRoleAuthorization], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoriaDeleted) {
            return res.status(400).json({
                ok: false,
                message: 'No existe ninguna categoria con esa referencia'
            });
        }

        res.status(200).json({
            ok: true,
            message: 'categoria borrada',
            categoria: categoriaDeleted
        });

    })

});

module.exports = app;