const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    //Rutas disponibles e existentes en la aplicacion
    this.usuariosPath = '/api/usuarios'

    //Middlewares ---> siempre se ejecutara cuando levantemos nuestro servidor;
    this.middlewares();
    //Rutas de mi aplicacion
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    // parseo y lectura del body, cualquier informacion que venga con POST, PUT, PATCH, DELETE .. la intenta serializar en formato JSON
    this.app.use(express.json())
    //Directorio publicos
    this.app.use(express.static("public"));
  }

  routes() {

    this.app.use( this.usuariosPath, require('../routes/user.js'));
    
  };
  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
