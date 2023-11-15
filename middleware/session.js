const { verify } = require("jsonwebtoken");
const {handdleHttpError}= require ("../utils/handleError")
const {verifyToken} = require ("../utils/handlejwt")
const {usersModel} = require("../models")

const authMiddleware = async(req,res,next) => {
    try {

        if(!req.headers.authorization){
            handdleHttpError(res,"NEED_START_SESSION",401);
            return
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if (!dataToken._id){
            handdleHttpError(res,"ERROR_ID_TOKEN",401);
            return
        }

        const user = await usersModel.findById(dataToken._id)

        req.user = user;

        next();
        
    } catch (e) {
        handdleHttpError(res,"NOT_SESSION",401)
        
    }
}

module.exports = authMiddleware