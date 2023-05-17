const { response } = require("express");
const { uploadArchive } = require("../helpers");

const cargarArchivo = async (req, res = response) => {
  
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg:'No hay archivos que subir'});
    return;
  };

  // Se suben imagenes al path
  const pathcomplete = await uploadArchive(req.files);

  res.json({
    path: pathcomplete
  })
};

  

module.exports = {
  cargarArchivo,
};
