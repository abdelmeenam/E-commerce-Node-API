const { param, validationResult } = require('express-validator');


// 1- create rules , 2- middleware , 3- Find validation error
const validatorMiddleware = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    next();
}


module.exports = validatorMiddleware;