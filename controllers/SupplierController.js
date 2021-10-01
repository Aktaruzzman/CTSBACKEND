const jwt = require('jsonwebtoken');
const SupplierModel = require("../models/SupplierModel");
const { langof } = require('../configs/lang');
const { getLogger, isIdMatched, isSystemUser, isSupplier } = require('../oauth/Oauth');
module.exports = {
    createSupplier: (req, res) => {
        let result = SupplierModel.createSupplier(req.body);
        result.then((rows) => {
            if (rows.length > 0) {
                res.status(200).send({ success: true, id: rows[0], msg: langof('proxy_saved_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'supplier') });
            } else res.status(422).send({ success: false });
        }).catch((err) => {
            res.status(422).send(err)
        });
    },
    findSupplier: (req, res) => {
        if (isSystemUser(getLogger(req)) || (isSupplier(getLogger(req)) && isIdMatched(getLogger(req), req.params.id))) {
            if (typeof(req.params.id) !== 'undefined' && Number(req.params.id) > 0) {
                let result = SupplierModel.findSupplierById(req.params.id, req.params.status);
                result.then((row) => {
                    if (row) {
                        row.name = { en: row.name_en, bn: row.name_bn }
                        delete row.name_en;
                        delete row.name_bn;
                        res.status(200).send({ success: true, entity: row });
                    } else res.status(422).send({ success: false, entity: null });
                }).catch((err) => {
                    res.status(422).send({ success: false, error: err })
                });
            } else {
                let result = SupplierModel.findAllSupplier(req.params);
                result.then((rows) => {
                    if (rows && rows.length > 0) {
                        for (let i = 0; i < rows.length; i++) {
                            rows[i].name = { en: rows[i].name_en, bn: rows[i].name_bn }
                            delete rows[i].name_en;
                            delete rows[i].name_bn;
                        }
                        res.status(200).send({ success: true, list: rows, total: rows[0].total ? rows[0].total : null });
                    } else res.status(422).send({ success: false, list: [] });
                }).catch((err) => {
                    res.status(422).send({ success: false, error: err })
                });
            }
        } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
    },
    updateSupplier: (req, res) => {
        if (isSystemUser(getLogger(req)) || (isSupplier(getLogger(req)) && isIdMatched(getLogger(req), req.params.id))) {
            let result = SupplierModel.updateSupplier(req.body, req.params.id, );
            result.then((status) => {
                if (status) res.status(200).send({ success: status, id: Number(req.params.id), msg: langof('proxy_saved_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'supplier') });
                else res.status(422).send({ success: status, msg: langof('proxy_saved_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'supplier') });
            }).catch((err) => {
                res.status(422).send({ success: false, error: err });
            });
        } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
    },
    deleteSupplier: (req, res) => {
        if (isSystemUser(getLogger(req))) {
            let result = SupplierModel.deleteSupplier(req.params.id, req.params.status);
            result.then((status) => {
                if (status) res.status(200).send({ success: status, id: Number(req.params.id), msg: langof('proxy_deleted_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'supplier') });
                else res.status(422).send({ success: status });
            }).catch((err) => {
                res.status(422).send({ success: false, error: err });
            });
        } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
    },
    logSupplier: (req, res) => {
        SupplierModel.logSupplier(req.body.username, req.body.password).then((row) => {
            if (row) {
                let payload = { id: row.id, name: { en: row.name_en, bn: row.name_bn }, role: row.role, group: 'supplier' };
                const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "30 minutes" });
                res.status(200).send({ user: { id: row.id, name: { en: row.name_en, bn: row.name_bn } }, accessToken: token });
            } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
        });
    },
}