const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//prevent Deprecation warning
mongoose.set('useCreateIndex', true);

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre es necesario'] },
    precioUni: { type: Number, required: [true, 'El precio Unitario es necesario'] },
    descripcion: { type: String, required: false },
    disponible: { type: Boolean, required: true, default: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

productoSchema.plugin(uniqueValidator, { message: 'El campo {PATH} es obligatorio' });

module.exports = mongoose.model('Producto', productoSchema);