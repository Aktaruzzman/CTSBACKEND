const db = require('../configs/database');
const bcrypt = require('bcryptjs');
const tbl = "geoupazilla";
const tbl_fields = ['geoupazilla.id', 'geoupazilla.name_en', 'geoupazilla.name_bn', 'geoupazilla.district_id', 'geodistrict.name_en as district_en', 'geodistrict.name_bn as district_bn'];
module.exports = {
    createUpazilla: (data) => {
        if (typeof(data.name_bn) === 'undefined') data.name_bn = data.name_en;
        return db(tbl).insert(data);
    },
    findAllUpazilla: (params) => {
        let query = db(tbl);
        query = query.join('geodistrict', tbl + '.district_id', '=', 'geodistrict.id');
        if (typeof(params.district_id) !== 'undefined' && Number(params.district_id) > 0) {
            query = query.where(tbl + '.district_id', params.district_id);
        }
        if ((typeof(params.limit) !== 'undefined' && Number(params.limit) > 0) && (typeof(params.offset) !== 'undefined' && Number(params.offset) >= 0)) {
            query = query.where((builder) => {
                if (typeof(params.status) !== 'undefined') builder.where(tbl + '.status', params.status);
                else builder.where(tbl + '.status', 'active').orWhere(tbl + '.status', 'inactive');
            });
            query = query.select(db.raw('count(' + tbl + '.id) OVER() as total')).where((builder) => {
                if (typeof(params.status) !== 'undefined') builder.where(tbl + '.status', params.status);
                else builder.where(tbl + '.status', 'active').orWhere(tbl + '.status', 'inactive');
            });
            query = query.limit(params.limit);
            query = query.offset(params.offset);
        } else if (typeof(params.search) !== 'undefined') {
            query = query.where((builder) => {
                if (typeof(params.status) !== 'undefined') builder.where(tbl + '.status', params.status);
                else builder.where(tbl + '.status', 'active').orWhere(tbl + '.status', 'inactive');
            });
            query = query.where((builder) => {
                builder.where(tbl + '.name_en', 'like', '%' + params.search + '%').orWhere(tbl + '.name_bn', 'like', '%' + params.search + '%');
            });
        } else {
            query = query.where((builder) => {
                if (typeof(params.status) !== 'undefined') builder.where(tbl + '.status', params.status);
                else builder.where(tbl + '.status', 'active').orWhere(tbl + '.status', 'inactive');
            });
        }
        return query.select(tbl_fields);
    },
    findUpazillaById: (id, status) => {
        let query = db(tbl);
        query = query.join('geodistrict', tbl + '.district_id', '=', 'geodistrict.id');
        query = query.where(tbl + '.id', Number(id));
        if (typeof(status) !== 'undefined') query = query.where(tbl + '.status', status);
        query = query.first();
        return query.select(tbl_fields);
    },
    findUpazillaByWhere: (wheres, wherenots) => {
        let query = db(tbl);
        query = query.where(wheres);
        if (typeof(wherenots) !== 'undefined') query = query.whereNot(wherenots);
        query = query.first();
        return query.select('*');
    },
    updateUpazilla: (data, id) => {
        let query = db(tbl);
        query = query.where('id', id);
        if (typeof(data.password) !== 'undefined') data.password = bcrypt.hashSync(data.password, 10)
        return query.update(data);
    },
    deleteUpazilla: (id, status) => {
        if (status)
            this.updateUpazilla({ status: 'archived' }, id);
        else {
            let query = db(tbl);
            query = query.where('id', id);
            return query.delete(data);
        }
    }
}