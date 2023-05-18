const { response } = require("express");
const { uploadArchive } = require("../helpers");
const { user, Product} = require('../models')

const cargarArchivo = async (req, res = response) => {
  
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg:'No hay archivos que subir'});
    return;
  };

  try {
    // Se suben imagenes al path
  const name = await uploadArchive(req.files , undefined , 'imgs');
  res.json({name})
  } catch (msg) {
    res.status(400).json({msg})
  }
};

const updateImage = async (req , res = response) => {
  
  const { id , coleccion } = req.params;

  let modelo 

  switch (coleccion) {
    case 'user':
        modelo = await user.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe un usuario con el id ${id}`
          });
        }
    break;

    case 'Product':
      modelo = await Product.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        });
      }

    break;

    default:
      return res.status(500).json({msg: 'Se me olvido validar esto'});
  }

  res.json({
    id , coleccion
  });
}

module.exports = {
  cargarArchivo,
  updateImage
};
