const { body } = require("express-validator");

const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if (apiKey === 'miguel') {
            next()
        } else {
            res.status(403)
            res.send({ error: "api key invalida " })
        }
    } catch (e) {
        res.status(403)
        res.send({ error: "algo ocurrio en el custom " })
    }
};

module.exports = customHeader;
