const jwt = require('jsonwebtoken');
const AdminModel = require("../models/AdminModel");
const { langof } = require('../configs/lang');
const { getLogger, isSuperadmin, isIdMatched } = require('../oauth/Oauth');
module.exports = {
    createAdmin: (req, res) => {
        if (isSuperadmin(getLogger(req))) {
            let result = AdminModel.createAdmin(req.body);
            result.then((rows) => {
                if (rows.length > 0) {
                    res.status(200).send({ success: true, id: rows[0], msg: langof('proxy_saved_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'user') });
                } else res.status(422).send({ success: false });
            }).catch((err) => {
                res.status(422).send({ success: false, error: err })
            });
        } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
    },
    findAdmin: (req, res) => {
        if (isSuperadmin(getLogger(req)) || isIdMatched(getLogger(req), req.params.id)) {
            if (typeof(req.params.id) !== 'undefined' && Number(req.params.id) > 0) {
                let result = AdminModel.findAdminById(req.params.id, req.params.status);
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
                let result = AdminModel.findAllAdmin(req.params);
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
    updateAdmin: (req, res) => {
        if (isSuperadmin(getLogger(req)) || isIdMatched(getLogger(req), req.params.id)) {
            let result = AdminModel.updateAdmin(req.body, req.params.id, );
            result.then((status) => {
                if (status) res.status(200).send({ success: status, id: Number(req.params.id), msg: langof('proxy_saved_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'user') });
                else res.status(422).send({ success: status, msg: langof('proxy_saved_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'user') });
            }).catch((err) => {
                res.status(422).send({ success: false, error: err })
            });
        } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
    },
    deleteAdmin: (req, res) => {
        if (isSuperadmin(getLogger(req))) {
            let result = AdminModel.deleteAdmin(req.params.id, req.params.status);
            result.then((status) => {
                if (status) res.status(200).send({ success: status, id: Number(req.params.id), msg: langof('proxy_deleted_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'user') });
                else res.status(422).send({ success: status });
            }).catch((err) => {
                res.status(422).send({ success: false, error: err })
            });
        } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
    },
    logAdmin: (req, res) => {
        AdminModel.logAdmin(req.body.username, req.body.password).then((row) => {
            if (row) {
                let payload = { id: row.id, name: { en: row.name_en, bn: row.name_bn }, role: row.role, group: 'system' };
                const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "8h" });
                res.status(200).send({ user: { id: row.id, name: { en: row.name_en, bn: row.name_bn } }, accessToken: token });
            } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
        });
    },
}