const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handdleHttpError } = require("../utils/handleError");
/**
 * obtener lista de base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async(req,res) => {
    try {
        const user = req.user;
        const data = await tracksModel.findAllData({});
        res.send({data ,user})
    } catch (e) {
        handdleHttpError(res,"Error en get items")
    }
};

/**
 * obtener detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async(req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findOneData(id);
        res.send({data})
    } catch (e) {
        console.log(e)
        handdleHttpError(res,"Error get detalle item")
    }
};

/**
 * insertar registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async(req,res) => {

    try {
        const body = matchedData(req)
        const data = await tracksModel.create(body);
        res.send({data})
    } catch (e) {
        handdleHttpError(res,"Error en create items")
    }

};

/**
 * actualizar registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async(req,res) => {
    try {
        const {id, ...body} = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(
            { _id: id }, // Utiliza un objeto para especificar el filtro de búsqueda
            body
        );
        res.send({data})
    } catch (e) {
        handdleHttpError(res,"Error en update items")
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async(req,res) => {

    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.delete({_id:id});
        res.send({ data })
    } catch (e) {
        
        handdleHttpError(res,"Error eliminar detalle item")
    }


};
module.exports = {getItems,getItem,createItem,updateItem,deleteItem};
