const jwt = require('jsonwebtoken');
const DistrictModel = require("../models/DistrictModel");
const { langof } = require('../configs/lang');
const { getLogger, isSystemUser } = require('../oauth/Oauth');
module.exports = {
    createDistrict: (req, res) => {
        let result = DistrictModel.createDistrict(req.body);
        result.then((rows) => {
            if (rows.length > 0) {
                res.status(200).send({ success: true, id: rows[0], msg: langof('proxy_saved_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'district') });
            } else res.status(422).send({ success: false });
        }).catch((err) => {
            res.status(422).send({ success: false, error: err })
        });
    },
    findDistrict: (req, res) => {
        if (typeof(req.params.id) !== 'undefined' && Number(req.params.id) > 0) {
            let result = DistrictModel.findDistrictById(req.params.id, req.params.status);
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
            let result = DistrictModel.findAllDistrict(req.params);
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
    },
    updateDistrict: (req, res) => {
        if (isSystemUser(getLogger(req))) {
            let result = DistrictModel.updateDistrict(req.body, req.params.id, );
            result.then((status) => {
                if (status) res.status(200).send({ success: status, id: Number(req.params.id), msg: langof('proxy_saved_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'district') });
                else res.status(422).send({ success: status, msg: langof('proxy_saved_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'district') });
            }).catch((err) => {
                res.status(422).send({ success: false, error: err })
            });
        } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
    },
    deleteDistrict: (req, res) => {
        if (isSystemUser(getLogger(req))) {
            let result = DistrictModel.deleteDistrict(req.params.id, req.params.status);
            result.then((status) => {
                if (status) res.status(200).send({ success: status, id: Number(req.params.id), msg: langof('proxy_deleted_successfully', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en', 'district') });
                else res.status(422).send({ success: status });
            }).catch((err) => {
                res.status(422).send({ success: false, error: err })
            });
        } else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
    }
}