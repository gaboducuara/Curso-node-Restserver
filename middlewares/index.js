const validarCampos = require("../middlewares/validar-campos");
const validarjwt = require("../middlewares/validar-jwt");
const validarRoles = require("../middlewares/validar-roles");

module.exports = {
    ...validarCampos,
    ...validarjwt,
    ...validarRoles
}