const express = require('express');
const router = express.Router();

const { ifAllowed } = require('../oauth/Oauth');
const { ParamValidation } = require("../validations/ParamValidation");
const { driverCreateValidation, driverUpdateValidation, driverLoginValidation } = require('../validations/DriverValidation');
const { logDriver, findDriver, createDriver, updateDriver, deleteDriver } = require('../controllers/DriverController');

router.get('/:id?/:status?/:limit?/:offset?', ifAllowed, ParamValidation, findDriver);
router.post('/', driverCreateValidation, createDriver);
router.put('/:id', ifAllowed, ParamValidation, driverUpdateValidation, updateDriver);
router.patch('/:id', ifAllowed, ParamValidation, driverUpdateValidation, updateDriver);
router.delete('/:id/:status?', ifAllowed, ParamValidation, deleteDriver);
router.post('/login', driverLoginValidation, logDriver);

module.exports = router;