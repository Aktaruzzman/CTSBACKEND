const { body, validationResult } = require('express-validator');
const { findAdminByWhere } = require("../models/AdminModel");
const { langof } = require("../configs/lang");
const statusArr = ['active', 'inactive', 'archived'];
const roleArr = ['superadmin', 'admin', 'manager', 'editor'];

module.exports.adminLoginValidation = [
    body('username').custom((value, { req }) => {
        if (typeof(value) === 'undefined' || value == '') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'username'));
        else return true
    }),
    body('password').custom((value, { req }) => {
        if (typeof(value) === 'undefined' || value == '') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'password'))
        else return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];
module.exports.adminCreateValidation = [
    body('role').custom((value, { req }) => {
        if (value == '' || typeof(req.body.role) === 'undefined') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'role'));
        else if (!roleArr.includes(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'role'));
        else return true;
    }),
    body('name_en').custom((value, { req }) => {
        if (value == '' || typeof(req.body.name_en) === 'undefined') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'name'));
        else if (!(/^[a-zA-Z\s]*$/).test(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'name'));
        else return true;
    }),
    body('phone').custom((value, { req }) => {
        if (value == '' || typeof(req.body.phone) === 'undefined') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'phone'));
        else if (!(/(^((01)|(03)|(04)){1}[3456789]{1}(\d){8})$/).test(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'phone'));
        else if (req.body.phone !== '' || typeof(req.body.phone) !== 'undefined') {
            return findAdminByWhere({ phone: req.body.phone }).then(user => {
                if (user) return Promise.reject(langof('proxy_already_in_use', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'phone_number'));
            });
        } else return true;
    }),
    body('email').custom((value, { req }) => {
        if (value == '' || typeof(req.body.email) === 'undefined') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'email_address'))
        else if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'email_address'))
        else if (req.body.email !== '' || typeof(req.body.email) !== 'undefined') {
            return findAdminByWhere({ email: req.body.email }).then(user => {
                if (user) return Promise.reject(langof('proxy_already_in_use', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'email_address'));
                else return true;
            });
        } else return true;
    }),
    body('password').custom((value, { req }) => {
        if (value == '' || typeof(req.body.password) === 'undefined') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'password'))
        else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(value)) throw new Error(langof('password_suggession_msg', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en'));
        else return true;
    }),
    body('status').custom((value, { req }) => {
        if (typeof(req.body.status) != 'undefined') {
            if (value == '' || typeof(req.body.status) === 'undefined') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'status'))
            else if (!statusArr.includes(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'status'))
            else return true;
        } else return true
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];
module.exports.adminUpdateValidation = [
    body('role').custom((value, { req }) => {
        if (typeof(req.body.role) !== 'undefined') {
            if (value == '') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'role'))
            else if (!roleArr.includes(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'role'));
            return true;
        } else return true;
    }),
    body('name_en').custom((value, { req }) => {
        if (typeof(req.body.name_en) !== 'undefined') {
            if (value == '') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'name'))
            else if (!(/^[a-zA-Z\s]*$/).test(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'name'));
            else return true;
        } else return true;
    }),
    body('name_bn').custom((value, { req }) => {
        if (typeof(req.body.bn_en) !== 'undefined') {
            if (value == '') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'name'))
            else return true;
        } else return true;
    }),
    body('phone').custom((value, { req }) => {
        if (typeof(req.body.phone) !== 'undefined') {
            if (value == '') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'role'))
            else if (!(/(^((01)|(03)|(04)){1}[3456789]{1}(\d){8})$/).test(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'phone'));
            else return findAdminByWhere({ phone: req.body.phone }, { id: req.params.id }).then(user => {
                if (user) return Promise.reject(langof('proxy_already_in_use', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'phone_number'));
                else return true;
            })
        } else return true
    }),
    body('email').custom((value, { req }) => {
        if (typeof(req.body.email) !== 'undefined') {
            if (value == '') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'email_address'));
            else if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value)) throw new Error(langof('proxy_is_invalid', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'email_address'));
            else return findAdminByWhere({ email: value }, { id: req.params.id }).then(user => {
                if (user) return Promise.reject(langof('proxy_already_in_use', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'email_address'));
                else return true;
            })
        } else return true
    }),
    body('password').custom((value, { req }) => {
        if (typeof(value) !== 'undefined') {
            if (value == '') throw new Error(langof('proxy_is_required', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'password'))
            else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(value)) throw new Error(langof('password_suggession_msg', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en'));
            else return true;
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