const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
const { handdleHttpError } = require("../utils/handleError");
const fs = require("fs")

/**
 * obtener lista de base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({ data })
    } catch (e) {
        handdleHttpError(res, "Error en lista de items");
    }
};

/**
 * obtener detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await storageModel.findById(id);
        res.send({ data })
    } catch (e) {
        handdleHttpError(res, "Error en detalle item");
    }
};

/**
 * insertar registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {

    try {
        const { file } = req;
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        };
        const data = await storageModel.create(fileData);
        res.send({ data });
        
    } catch (e) {
        handdleHttpError(res, "Error en crear item");
    }


};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const dataFile = await storageModel.findById(id);
        await storageModel.deleteMany({_id:id})
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`//ruta para eliminar archivos
        //fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: 1
        };
        res.send({ data });
    } catch (e) {
        handdleHttpError(res, "Error en detalle item");
    }
};


module.exports = { getItems, getItem, createItem, deleteItem };
