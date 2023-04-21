const Role = require('../models/role');
const user = require('../models/user')
const mongoose = require('mongoose');


const esRolValido = async (rol = '') => {
       // verificar si el Rol existe
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
      throw new Error(`El rol , ${ rol } no esta registrado en la base de datos`);
    }
  }

  const EmailExiste = async ( email = '') => {
     // verificar si el correo existe
    const existeEmail = await user.findOne ({ email })
    if ( existeEmail ) {
      throw new Error(`El Email: ${ email } , ya esta registrado`)
    }
  }

  const UserById = async ( id ) => {
    // verificar si el Usuario existe
   if ( mongoose.Types.ObjectId.isValid (id)) {
     const existeId = await user.findById ( id )

     if ( !existeId ) {
      throw new Error(`El Id ${ id } no existe en la base de datos `)
   }   
   } else {
    throw new Error(`El Id ${ id } no es valido`)
 
   }
 }

  module.exports = {
    esRolValido,
    EmailExiste,
    UserById
  }