const express = require('express');
const router = express.Router();

const { ifAllowed, ifSystemUser } = require('../oauth/Oauth');
const { ParamValidation } = require("../validations/ParamValidation");
const { adminCreateValidation, adminUpdateValidation, adminLoginValidation } = require('../validations/AdminValidation');
const { logAdmin, findAdmin, createAdmin, updateAdmin, deleteAdmin } = require('../controllers/AdminController');

router.get('/:id?/:status?/:limit?/:offset?', ifAllowed, ifSystemUser, ParamValidation, findAdmin);
router.post('/', ifAllowed, ifSystemUser, adminCreateValidation, createAdmin);
router.put('/:id', ifAllowed, ifSystemUser, ParamValidation, adminUpdateValidation, updateAdmin);
router.patch('/:id', ifAllowed, ifSystemUser, ParamValidation, adminUpdateValidation, updateAdmin);
router.delete('/:id/:status?', ifAllowed, ifSystemUser, ParamValidation, deleteAdmin);
router.post('/login', adminLoginValidation, logAdmin);

module.exports = router;