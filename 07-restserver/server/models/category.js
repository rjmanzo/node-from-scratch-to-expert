const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//prevent Deprecation warning
mongoose.set('useCreateIndex', true);

let Schema = mongoose.Schema;

//let Usuario = require('../models/users');

let CategoriaSchema = new Schema({

    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

})

// Apply the uniqueValidator plugin to userSchema.
CategoriaSchema.plugin(uniqueValidator, { message: 'El campo {PATH} es obligatorio' });

module.exports = mongoose.model('Categoria', CategoriaSchema);