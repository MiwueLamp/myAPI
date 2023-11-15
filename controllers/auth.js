const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlepassword");
const { usersModel } = require("../models");
const { tokenSign } = require("../utils/handlejwt");
const { handdleHttpError } = require("../utils/handleError");


/**
 * este controlador loguea usuarios
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {

    try {

        req = matchedData(req);
        const user = await usersModel.findOne({email:req.email}).select('password name role email');
        if (!user){
            handdleHttpError(res,"USER_NOT_EXISTS",404);
            return
        }

        const hashPassword = user.get('password');
        const check = await compare(req.password,hashPassword)

        user.set('password',undefined,{strict:false});

        if (!check){
            handdleHttpError(res,"PASSWORD_INVALID",401);
            return
        }
        const data = {

            token: await tokenSign (user),
            user
        }

        res.send({data})

    } catch (e) {
        handdleHttpError(res, "ERROR_LOGIN_USER");
    }

}







/**
 * este controlador registra usuarios
 * @param {*} req 
 * @param {*} res 
 */

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = { ...req, password }
        const dataUser = await usersModel.create(body)
        dataUser.set('password', undefined, { strict: false });

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser,
        }
        res.send({ data });

    } catch (error) {
        handdleHttpError(res, "ERROR_REGISTER_USER");
    }
}

module.exports = { registerCtrl, loginCtrl }