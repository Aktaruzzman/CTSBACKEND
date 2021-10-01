/*******************************
 * NODE MODULES IMPORT SECTION *
 *******************************/
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('dotenv').config();
//const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
/*************************
 * ROUTER IMPORT SECTION *
 *************************/
const indexRouter = require('./routes/indexRouter');
const adminRouter = require('./routes/adminRouter');
const customerRouter = require('./routes/customerRouter');
const supplierRouter = require('./routes/supplierRouter');
const driverRouter = require('./routes/driverRouter');
const ownerRouter = require('./routes/ownerRouter');
const districtRouter = require('./routes/districtRouter');
const upazillaRouter = require('./routes/upazillaRouter');
const unionRouter = require('./routes/unionRouter');
const brandRouter = require('./routes/brandRouter');
/****************************
 * SET & USE GLOBAL MODULES
 *****************************/
app.use(bodyParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/************************
 * SET MY ROUTER LIST   *
 ************************/
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/customer', customerRouter);
app.use('/supplier', supplierRouter);
app.use('/driver', driverRouter);
app.use('/owner', ownerRouter);
app.use('/district', districtRouter);
app.use('/upazilla', upazillaRouter);
app.use('/union', unionRouter);
app.use('/brand', brandRouter);
/************************
 * CATCH HANDLE ERROR   *
 ***********************/
app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;