const { response , request} = require('express');

const userGet = (req = request, res = response) => {

    const { page = 1, limit = 10, q, nombre = 'not name', apikey} = req.query;


    res.json({
      msg: "get usuario - controlador",
      q, nombre , apikey, page, limit
    });
  }


  const userPost = (req, res = response)  => {

    const { TemasInteres } = req.body

    res.status(201).json({
      msg: "Post usuario - controlador",
      TemasInteres,
    });
  }

  const userPut = (req, res = response) => {
    //forma 1 
    // const id = req.params.id
    //forma 2
    const {id} = req.params

    res.status(500).json({
      msg: "peticion Put a mi API",
      id,
    });
  }

  const userDelete = (req, res = response) => {
    res.json({
      msg: "peticion delete a mi API",
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