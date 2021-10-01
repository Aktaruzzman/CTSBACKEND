const jwt = require('jsonwebtoken');
const DriverModel = require("../models/DriverModel");
const { langof } = require('../configs/lang');
const { getLogger, isIdMatched, isSystemUser, isDriver } = require('../oauth/Oauth');
module.exports = {
    createDriver: (req, res) => {
        let result = DriverModel.createDriver(req.body);
        result.then((rows) => {
            if (rows.length > 0) {
                res.status(200).send({ success: true, id: rows[0], msg: langof('proxy_saved_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'driver') });
            } else res.status(422).send({ success: false });
        }).catch((err) => {
            res.status(422).send({ success: false, error: err })
        });
    },
    findDriver: (req, res) => {
        if (isSystemUser(getLogger(req)) || (isDriver(getLogger(req)) && isIdMatched(getLogger(req), req.params.id))) {
            if (typeof(req.params.id) !== 'undefined' && Number(req.params.id) > 0) {
                let result = DriverModel.findDriverById(req.params.id, req.params.status);
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
                let result = DriverModel.findAllDriver(req.params);
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
    updateDriver: (req, res) => {
        if (isSystemUser(getLogger(req)) || (isDriver(getLogger(req)) && isIdMatched(getLogger(req), req.params.id))) {
            let result = DriverModel.updateDriver(req.body, req.params.id, );
            result.then((status) => {
                if (status) res.status(200).send({ success: status, id: Number(req.params.id), msg: langof('proxy_saved_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'driver') });
                else res.status(422).send({ success: status, msg: langof('proxy_saved_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'driver') });
            }).catch((err) => {
                res.status(422).send({ success: false, error: err });
            });
        } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
    },
    deleteDriver: (req, res) => {
        if (isSystemUser(getLogger(req))) {
            let result = DriverModel.deleteDriver(req.params.id, req.params.status);
            result.then((status) => {
                if (status) res.status(200).send({ success: status, id: Number(req.params.id), msg: langof('proxy_deleted_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'driver') });
                else res.status(422).send({ success: status });
            }).catch((err) => {
                res.status(422).send({ success: false, error: err });
            });
        } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
    },
    logDriver: (req, res) => {
        DriverModel.logDriver(req.body.username, req.body.password).then((row) => {
            if (row) {
                let payload = { id: row.id, name: { en: row.name_en, bn: row.name_bn }, role: row.role, group: 'driver' };
                const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
                res.status(200).send({ user: { id: row.id, name: { en: row.name_en, bn: row.name_bn } }, accessToken: token });
            } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
        });
    },
}