const express = require('express');
const router = express.Router();

const { ifAllowed, ifSystemUser } = require('../oauth/Oauth');
const { ParamValidation } = require("../validations/ParamValidation");
const { districtCreateValidation, districtUpdateValidation } = require('../validations/DistrictValidation');
const { findDistrict, createDistrict, updateDistrict, deleteDistrict } = require('../controllers/DistrictController');

router.get('/:id?/:status?/:limit?/:offset?', ifAllowed, ParamValidation, findDistrict);
router.post('/', ifAllowed, ifSystemUser, districtCreateValidation, createDistrict);
router.put('/:id', ifAllowed, ifSystemUser, ParamValidation, districtUpdateValidation, updateDistrict);
router.patch('/:id', ifAllowed, ifSystemUser, ParamValidation, districtUpdateValidation, updateDistrict);
router.delete('/:id/:status?', ifAllowed, ifSystemUser, ParamValidation, deleteDistrict);


module.exports = router;