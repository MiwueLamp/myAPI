const express = require("express");
const router = express.Router();
const {validatorRegister,validatorLogin} = require ("../validators/auth");
const { registerCtrl , loginCtrl} = require("../controllers/auth");



// TODO http://localhost:3001/api/auth/login
// TODO http://localhost:3001/api/auth/register

router.post("/register",validatorRegister,registerCtrl); //Registrar

router.post("/login",validatorLogin, loginCtrl); //loguear

module.exports = router;