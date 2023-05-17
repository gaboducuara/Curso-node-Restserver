const { response } = require("express");
const { uploadArchive } = require("../helpers");

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

  

module.exports = {
  cargarArchivo,
};
