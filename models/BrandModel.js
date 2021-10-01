const db = require('../configs/database');
const bcrypt = require('bcryptjs');
const tbl = "brand";
const tbl_fields = ['id', 'name_en', 'name_bn', 'status', 'trade', 'logo', 'banner', 'bgcolor', 'txtcolor'];
module.exports = {
    createBrand: (data) => {
        if (typeof(data.password) !== 'undefined') data.password = bcrypt.hashSync(data.password, 10)
        if (typeof(data.name_bn) === 'undefined') data.name_bn = data.name_en;
        return db(tbl).insert(data);
    },
    findAllBrand: (params) => {
        let query = db(tbl);
        if ((typeof(params.limit) !== 'undefined' && Number(params.limit) > 0) && (typeof(params.offset) !== 'undefined' && Number(params.offset) >= 0)) {
            query = query.where((builder) => {
                if (typeof(params.status) !== 'undefined') builder.where({ status: params.status });
                else builder.where({ status: 'active' }).orWhere({ status: 'inactive' });
            });
            query = query.select(db.raw('count(id) OVER() as total')).where((builder) => {
                if (typeof(params.status) !== 'undefined') builder.where({ status: params.status });
                else builder.where({ status: 'active' }).orWhere({ status: 'inactive' });
            });
            query = query.limit(params.limit);
            query = query.offset(params.offset);
        } else if (typeof(params.search) !== 'undefined') {
            query = query.where((builder) => {
                if (typeof(params.status) !== 'undefined') builder.where({ status: params.status });
                else builder.where({ status: 'active' }).orWhere({ status: 'inactive' });
            });
            query = query.where((builder) => {
                builder.where('name_en', 'like', '%' + params.search + '%').orWhere('name_bn', 'like', '%' + params.search + '%').orWhere('phone', 'like', '%' + params.search + '%').orWhere('email', 'like', '%' + params.search + '%');
            });
        } else {
            query = query.where((builder) => {
                if (typeof(params.status) !== 'undefined') builder.where({ status: params.status });
                else builder.where({ status: 'active' }).orWhere({ status: 'inactive' });
            });
        }
        return query.select(tbl_fields);
    },
    findBrandById: (id, status) => {
        let query = db(tbl);
        query = query.where('id', Number(id));
        if (typeof(status) !== 'undefined') query = query.where('status', status);
        query = query.first();
        return query.select(tbl_fields);
    },
    findBrandByWhere: (wheres, wherenots) => {
        let query = db(tbl);
        query = query.where(wheres);
        if (typeof(wherenots) !== 'undefined') query = query.whereNot(wherenots);
        query = query.first();
        return query.select(tbl_fields);
    },
    updateBrand: (data, id) => {
        let query = db(tbl);
        query = query.where('id', id);
        if (typeof(data.password) !== 'undefined') data.password = bcrypt.hashSync(data.password, 10)
        return query.update(data);
    },
    deleteBrand: (id, status) => {
        if (status)
            this.updateBrand({ status: 'archived' }, id);
        else {
            let query = db(tbl);
            query = query.where('id', id);
            return query.delete(data);
        }
    },
}