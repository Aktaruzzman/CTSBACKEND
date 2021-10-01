const db = require('../configs/database');
const bcrypt = require('bcryptjs');
const tbl = "owner";
const tbl_fields = ['id', 'name_en', 'name_bn', 'role', 'phone', 'email', 'status', 'updated_at'];
module.exports = {
    createOwner: (data) => {
        if (typeof(data.password) !== 'undefined') data.password = bcrypt.hashSync(data.password, 10)
        if (typeof(data.name_bn) === 'undefined') data.name_bn = data.name_en;
        return db(tbl).insert(data);
    },
    findAllOwner: (params) => {
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
    findOwnerById: (id, status) => {
        let query = db(tbl);
        query = query.where('id', Number(id));
        if (typeof(status) !== 'undefined') query = query.where('status', status);
        query = query.first();
        return query.select(tbl_fields);
    },
    findOwnerByWhere: (wheres, wherenots) => {
        let query = db(tbl);
        query = query.where(wheres);
        if (typeof(wherenots) !== 'undefined') query = query.whereNot(wherenots);
        query = query.first();
        return query.select(tbl_fields);
    },
    updateOwner: (data, id) => {
        let query = db(tbl);
        query = query.where('id', id);
        if (typeof(data.password) !== 'undefined') data.password = bcrypt.hashSync(data.password, 10)
        return query.update(data);
    },
    deleteOwner: (id, status) => {
        if (status)
            this.updateOwner({ status: 'archived' }, id);
        else {
            let query = db(tbl);
            query = query.where('id', id);
            return query.delete(data);
        }
    },
    logOwner: (username, password) => {
        let query = db(tbl);
        query = query.where((builder) => {
            builder.where('phone', username).orWhere('email', username);
        });
        query = query.where('status', 'active');
        query = query.first();
        query = query.select(['id', 'name_en', 'name_bn', 'role', 'phone', 'email', 'password']);
        return query.then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                delete user.password;
                return user;
            } else return false;
        });
    },
}