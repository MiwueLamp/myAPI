const express = require("express");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks"); // Importa ambas funciones aquí
const router = express.Router();
const customHeader = require("../middleware/customHeader")
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

router.get("/", authMiddleware, getItems); // ruta para traer los items

router.get("/:id", validatorGetItem, authMiddleware, getItem); // ruta para un detalle

router.post("/", validatorCreateItem, authMiddleware, checkRol(["admin"]), createItem); // ruta para crear item

router.put("/:id", validatorGetItem, validatorCreateItem, authMiddleware, updateItem); // ruta para actualizar un detalle

router.delete("/:id", validatorGetItem, authMiddleware, deleteItem); // ruta para eliminar






module.exports = router;
