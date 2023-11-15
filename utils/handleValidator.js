const {validationResult} =require ("express-validator")

const validateResults =(req,res,next)=>{


try {
    validationResult(req).throw()
    return next()// seguir hacia el controlador
    
} catch (err) {

    res.status(403)//muestrame el error
    res.send({errors:err.array()})
    
}

}

module.exports = validateResults;