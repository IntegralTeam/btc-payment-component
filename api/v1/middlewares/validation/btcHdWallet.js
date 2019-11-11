let errors = require('../../../../config/errors');
const callbacks = { ...require('../../callbacks') };
const { body, validationResult } = require('express-validator/check');

module.exports.create = (req, res, next) => {
    return [
        body('externalId')
            .exists().bail().withMessage('required')
            .trim()
            .not().isEmpty().bail().withMessage('should not be empty')
            .not().isJSON().withMessage('should be String')
            .isString().withMessage('should be String'),
        //
        body('expectedAmount')
            .exists().bail().withMessage('required')
            .isFloat({ gt: 0 }).withMessage('should be Float and greater than zero'),
        //
        body('callbackName')
            .optional()
            .trim()
            .not().isEmpty().bail().withMessage('should not be empty')
            .isString().bail().withMessage('should be String')
            .custom(callbackName => {
                if (!callbacks[callbackName])
                    return false;
                else
                    return true;
            }).withMessage('Not found'),
        //
        body('callbackArgs')
            .optional()
            .trim()
            .isJSON().withMessage('Should be JSON'),
        //
        
        async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) 
            next(errors.badRequest( err.array() ));
        else 
            next();
        }
    ];
};

module.exports.setHdSeed = (req, res, next) => {
    return [
        body('newkeypool')
            .optional()
            .isBoolean().withMessage('should be Boolean'),
        //
        
        async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) 
            next(errors.badRequest( err.array() ));
        else 
            next();
        }
    ];
};