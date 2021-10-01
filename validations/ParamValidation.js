const { param, validationResult } = require('express-validator');
const { langof } = require("../configs/lang");
const statusArr = ['active', 'inactive', 'archived'];
module.exports.ParamValidation = [
    param('id').custom((value, { req }) => {
        if (typeof(value) !== 'undefined') {
            if (isNaN(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'id'));
            else return true;
        } else return true;
    }),
    param('limit').custom((value, { req }) => {
        if (typeof(value) !== 'undefined') {
            if (isNaN(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'limit'));
            else return true;
        } else return true;
    }),
    param('offset').custom((value, { req }) => {
        if (typeof(value) !== 'undefined') {
            if (isNaN(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'offset'));
            else return true;
        } else return true;
    }),
    param('status').custom((value, { req }) => {
        if (typeof(value) !== 'undefined') {
            if (!statusArr.includes(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'status'));
            else return true;
        } else return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];