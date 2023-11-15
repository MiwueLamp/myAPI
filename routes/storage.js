const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { getItems,getItem,createItem,deleteItem } = require("../controllers/storage");
const {validatorGetItem} = require ("../validators/storage")

// Define una ruta para manejar las solicitudes POST en la URL http://localhost:3001/api/storage
// El middleware `uploadMiddleware.single("myfile")` maneja la carga de archivos
// Se espera que el archivo se encuentre en un campo de formulario llamado "myfile"


router.post("/", uploadMiddleware.single("myfile"), createItem); // crear archivo

router.get("/", getItems);// traer lista de items

router.delete("/:id",validatorGetItem, deleteItem);// eliminar item

router.get("/:id",validatorGetItem, getItem);// traer detalle de item



module.exports = router;
