const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//prevent Deprecation warning
mongoose.set('useCreateIndex', true);

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'el email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesario']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    estado: {
        type: Boolean,
        default: true,
        required: false
    },
    google: {
        type: Boolean,
        default: false,
        required: false
    }
});

usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};


// Apply the uniqueValidator plugin to userSchema.
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser incluido' });

module.exports = mongoose.model('Usuario', usuarioSchema);