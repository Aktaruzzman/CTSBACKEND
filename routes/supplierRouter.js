const express = require('express');
const router = express.Router();

const { ifAllowed } = require('../oauth/Oauth');
const { ParamValidation } = require("../validations/ParamValidation");
const { supplierCreateValidation, supplierUpdateValidation, supplierLoginValidation } = require('../validations/SupplierValidation');
const { logSupplier, findSupplier, createSupplier, updateSupplier, deleteSupplier } = require('../controllers/SupplierController');

router.get('/:id?/:status?/:limit?/:offset?', ifAllowed, ParamValidation, findSupplier);
router.post('/', supplierCreateValidation, createSupplier);
router.put('/:id', ifAllowed, ParamValidation, supplierUpdateValidation, updateSupplier);
router.patch('/:id', ifAllowed, ParamValidation, supplierUpdateValidation, updateSupplier);
router.delete('/:id/:status?', ifAllowed, ParamValidation, deleteSupplier);
router.post('/login', supplierLoginValidation, logSupplier);

module.exports = router;