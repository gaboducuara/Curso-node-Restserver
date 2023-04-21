const { Router } = require("express");
const { check } = require("express-validator");
//controller
const { login } = require("../controllers/auth");
//middleware
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/login", [ 
    check('email', 'El email es obligatorio').isEmail(), 
    check('password', 'La contraseña debe ser obligatoria y mas de 6 caracteres').not().isEmpty().isLength({ min:6 }),
    validarCampos
] , login);

module.exports = router;