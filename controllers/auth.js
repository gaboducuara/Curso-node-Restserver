const { response } = require("express");
const bcryptjs = require('bcryptjs');
const user = require('../models/user');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const Userlogin = await user.findOne({ email });
    if (!Userlogin) {
      return res.status(400).json ({ 
        msg:'Usuario / Password no son correctos - email'
      });
    }
    // Si el usuario esta activo
    if (!Userlogin.status) {
      return res.status(400).json ({
        msg:`Usuario / Password no son correctos - status:${Userlogin.status}`
      });
    }
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync( password , Userlogin.password)
    if(!validPassword) {
      // console.log(validPassword)
      return res.status(400).json ({
        msg:`Usuario / Password no son correctos - El password es ${validPassword}`
      });
    }

    //  Generar el JWT
      const token = await generarJWT(Userlogin.id);

    res.json({
      Userlogin,
      token
      
    });

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg:'Hable con el administrador'
    })
  }
};

module.exports = {
  login,
};
