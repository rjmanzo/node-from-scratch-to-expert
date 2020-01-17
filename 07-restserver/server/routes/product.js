const express = require('express');
const _ = require('underscore');

const Producto = require('../models/product');

const { tokenauthentication } = require('../middlewares/authentification');

const app = express()

//GET 
app.get('/producto', tokenauthentication, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 0;
    limite = Number(limite);

    //Define filter conditions
    let filtering = {
        disponible: true
    }

    Producto.find(filtering)
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                })
            }

            return res.status(200).json({
                ok: true,
                producto: producto

            });

        })

});
//GET by ID
app.get('/producto/:id', tokenauthentication, (req, res) => {

    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                })
            }

            return res.status(200).json({
                ok: true,
                producto: producto

            });

        })

});

// Get data by Description
app.get('/producto/buscar/:termino', tokenauthentication, (req, res) => {
    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');
    //console.log(regex);

    Producto.find({ nombre: regex })
        .populate('Description', 'nombre')
        .exec((err, producto) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                })
            }

            return res.status(200).json({
                ok: true,
                producto: producto

            });

        })
});

//POST
app.post('/producto', tokenauthentication, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });

});
//UPDATE
app.put('/producto/:id', tokenauthentication, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let productoToUpdate = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    }

    Producto.findByIdAndUpdate(id, productoToUpdate, { new: true }, (err, productoDB) => {

        if (err) {
            console.log(categoriaDB);
            return res.status(500).json({
                ok: 'false',
                err: err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Este producto no existe'
                }
            })
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    })

});
//DELETE
app.delete('/producto/:id', tokenauthentication, (req, res) => {
    let id = req.params.id;

    let disponibleNuevo = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, disponibleNuevo, { new: true }, (err, productoDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!productoDeleted) {
            return res.status(400).json({
                ok: false,
                message: 'No existe ningun producto con esa referencia'
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Producto borrada',
            producto: productoDeleted
        });

    })

});

module.exports = app;