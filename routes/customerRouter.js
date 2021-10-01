const express = require('express');
const router = express.Router();

const { ifAllowed } = require('../oauth/Oauth');
const { ParamValidation } = require("../validations/ParamValidation");
const { customerCreateValidation, customerUpdateValidation, customerLoginValidation } = require('../validations/CustomerValidation');
const { logCustomer, findCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/CustomerController');

router.get('/:id?/:status?/:limit?/:offset?', ifAllowed, ParamValidation, findCustomer);
router.post('/', customerCreateValidation, createCustomer);
router.put('/:id', ifAllowed, ParamValidation, customerUpdateValidation, updateCustomer);
router.patch('/:id', ifAllowed, ParamValidation, customerUpdateValidation, updateCustomer);
router.delete('/:id/:status?', ifAllowed, ParamValidation, deleteCustomer);
router.post('/login', customerLoginValidation, logCustomer);

module.exports = router;