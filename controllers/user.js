const bcryptjs = require('bcryptjs');
const { response , request, query} = require('express');
const User = require('../models/user');


const userGet = async (req = request, res = response) => {

    // const { page = 1, limit = 10, q , name = 'not name', apikey} = req.query;
    const { limite = 20 , desde = 0 } = req.query;
    const query = { status:true };
    // const {id, name, apellido, comentario} = req.body
  const [total , user] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
        .skip(Number( desde ))
        .limit(Number(limite))
  ])

    res.json({
      total , user
    });
  }

  const userPost = async (req, res = response)  => {

    const {name, email , password , rol} = req.body
    const user = new User({name, email , password , rol});

      // encriptar contraseña
    const salt = bcryptjs.genSaltSync(12);
    user.password = bcryptjs.hashSync( password , salt);

    // guardar en base de datos
    await user.save();

    res.status(201).json({
      msg: "Post usuario - controlador",
      user
    });
  }

  // https://en.nuclea.solutions/interns-program/flutter-internship


  const userPut = async (req, res = response) => {
    //forma 1 
    // const id = req.params.id
    //forma 2
    const {id} = req.params
    const { _id, password , google, email , ...resto} = req.body;

    // validar informacion procedente de la base de datos
    if ( password ) {
      // encriptar contraseña
        const salt = bcryptjs.genSaltSync(12);
        resto.password = bcryptjs.hashSync( password , salt);
    }

    const userdb = await User.findByIdAndUpdate( id, resto );

    res.status(200).json(userdb);
  }

  const userDelete = async (req, res = response) => {

    const { id } = req.params;

    //Eliminar usuario Fisicamente
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id , {status: false});
    
    res.json({
      user
    });
  }

  const userPatch = (req, res = response) => {
    res.json({
      msg: "peticion patch a mi API",
    });
  }


  module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
  }