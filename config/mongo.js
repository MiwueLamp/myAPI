const mongoose = require("mongoose");

async function dbConnect() {
  try {
    const DB_URI = process.env.DB_URI;
    await mongoose.connect(DB_URI, {

    });
    console.log('***** CONEXIÓN CORRECTA ******');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

module.exports = dbConnect;