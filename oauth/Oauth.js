const jwt = require('jsonwebtoken');
const { langof } = require('../configs/lang');
module.exports = {
    ifAllowed: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) {
            res.status(401).send({ success: false, msg: langof('unauthorized_access', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            //console.log(user);
            if (err) {
                res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
            } else next();
        });
    },
    getLogger: (req) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        return jwt.decode(token);
    },
    ifSystemUser: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        let user = jwt.decode(token);
        if (['system'].includes(user.group) && ['superadmin', 'admin', 'manager', 'editor'].includes(user.role)) next();
        else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
    },
    ifShopUser: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        let user = jwt.decode(token);
        if (['shop'].includes(user.group) && ['owner', 'admin', 'salesman', 'waiter', 'chef'].includes(user.role)) next();
        else res.status(403).send({ success: false, msg: langof('access_forbidden', ['en', 'bn'].includes(req.headers.lang) ? req.headers.lang : 'en') });
    },
    //System
    isSystemUser: (user) => ['system'].includes(user.group) && ['superadmin', 'admin', 'manager', 'editor'].includes(user.role),
    isSuperadmin: (user) => user.group === 'system' && user.role === 'superadmin',
    isAdmin: (user) => user.group === 'system' && user.role === 'admin',
    isManager: (user) => user.group === 'system' && user.role === 'manager',
    isEditor: (user) => user.group === 'system' && user.role === 'editor',
    //shop
    isOwner: (user) => user.group === 'shop' && user.role === 'owner',
    isShopuser: (user) => user.group === 'shop' && ['owner', 'admin', 'salesman', 'waiter', 'chef'].includes(user.role),
    isTradeadmin: (user) => user.group === 'shop' && user.role === 'admin',
    isSalesman: (user) => user.group === 'shop' && user.role === 'salesman',
    isWaiter: (user) => user.group === 'shop' && user.role === 'waiter',
    isChef: (user) => user.group === 'shop' && user.role === 'chef',
    //Logistics 
    isDriver: (user) => user.group === 'driver' && user.role === 'driver',
    isCustomer: (user) => user.group === 'customer' && user.role === 'customer',
    isSupplier: (user) => user.group === 'supplier' && user.role === 'supplier',
    //does id match
    isIdMatched: (user, id) => Number(user.id) === Number(id),
}