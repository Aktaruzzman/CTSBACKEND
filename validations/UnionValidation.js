const { body, validationResult } = require('express-validator');
const { findUnionByWhere } = require("../models/UnionModel");
const { langof } = require("../configs/lang");
const statusArr = ['active', 'inactive', 'archived'];

module.exports.unionCreateValidation = [
    body('upazilla_id').custom((value, { req }) => {
        if (typeof(value) === 'undefined') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'upazilla'));
        else if (!(/^[1-9]+[0-9]*$/).test(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'upazilla'));
        else return true;
    }),
    body('name_en').custom((value, { req }) => {
        if (typeof(value) === 'undefined') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'union'));
        else if (!(/^[a-zA-Z\s]*$/).test(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'union'));
        else if (value !== '') {
            return findUnionByWhere({ name_en: value, upazilla_id: req.body.upazilla_id }).then(user => {
                if (user) return Promise.reject(langof('proxy_already_in_use', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'union'));
                else return true;
            });
        } else return true;
    }),
    body('status').custom((value, { req }) => {
        if (typeof(req.params.status) !== 'undefined') {
            if (!statusArr.includes(value)) throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'status'));
            else return true;
        } else return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];
module.exports.unionUpdateValidation = [
    body('upazilla_id').custom((value, { req }) => {
        if (typeof(req.body.bn_en) !== 'undefined') {
            if (!(/^[1-9]+[0-9]*$/).test(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'upazilla'));
            else return true;
        } else return true;
    }),
    body('name_en').custom((value, { req }) => {
        if (typeof(req.body.name_en) !== 'undefined') {
            if (value == '') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'upazilla'))
            else if (!(/^[a-zA-Z\s]*$/).test(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'upazilla'));
            else if (value !== '') {
                return findUnionByWhere({ name_en: value, upazilla_id: req.body.upazilla_id }, { id: req.params.id }).then(user => {
                    if (user) return Promise.reject(langof('proxy_already_in_use', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'upazilla'));
                    else return true;
                });
            } else return true;
        } else return true;
    }),
    body('name_bn').custom((value, { req }) => {
        if (typeof(req.body.name_bn) !== 'undefined') {
            if (value == '') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'upazilla'));
            else if (value !== '') {
                return findUnionByWhere({ name_bn: value, upazilla_id: req.body.upazilla_id }, { id: req.params.id }).then(user => {
                    if (user) return Promise.reject(langof('proxy_already_in_use', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'upazilla'));
                    else return true;
                });
            } else return true;
        } else return true;
    }),

    body('status').custom((value, { req }) => {
        if (typeof(req.params.status) !== 'undefined') {
            if (!statusArr.includes(value)) throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'status'));
            else return true;
        } else return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];