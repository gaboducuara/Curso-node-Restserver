const { Schema , model } = require('mongoose');

const UsuarioSchema = Schema ({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'la contraseña es obligatoria'],
        min: 5,
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }

});

// Forma para que no aparezca el password ni el __v0 en postman ...

UsuarioSchema.methods.toJSON = function() {
    const { __v , password, ...User} = this.toObject();
    return User;
}

module.exports = model('user', UsuarioSchema );