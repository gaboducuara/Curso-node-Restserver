const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { response } = require("express");

const cargarArchivo = (req, res = response) => {
  
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg:'No hay archivos que subir'});
    return;
  }

  const {archivo} = req.files;
  const nombreCortado = archivo.name.split('.')
  const extension = nombreCortado [nombreCortado.length - 1];

  // Aqui validamos los terminos o datos que queremos
  const extensionValidate = ['jpeg', 'gif', 'png', 'jpg']
  if (!extensionValidate.includes(extension)) {
    return res.status(400).json({
        msg: `La extension ${extension} no es permitida, son permitidas las siguientes extensiones ${extensionValidate}`
    })
  }

  const nombreTemp = uuidv4() + '.' + extension;
  const uploadPath = path.join( __dirname, "../uploads/", nombreTemp );

  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({err});
    }

    res.json({meg: 'File upload to' + uploadPath});
  });
};

module.exports = {
  cargarArchivo,
};
