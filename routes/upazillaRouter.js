const express = require('express');
const router = express.Router();

const { ifAllowed, ifSystemUser } = require('../oauth/Oauth');
const { ParamValidation } = require("../validations/ParamValidation");
const { upazillaCreateValidation, upazillaUpdateValidation } = require('../validations/UpazillaValidation');
const { findUpazilla, createUpazilla, updateUpazilla, deleteUpazilla } = require('../controllers/UpazillaController');

router.get('/:id?/:district_id?/:limit?/:offset?/:status?', ParamValidation, findUpazilla);
router.post('/', ifAllowed, ifSystemUser, upazillaCreateValidation, createUpazilla);
router.put('/:id', ifAllowed, ifSystemUser, ParamValidation, upazillaUpdateValidation, updateUpazilla);
router.patch('/:id', ifAllowed, ifSystemUser, ParamValidation, upazillaUpdateValidation, updateUpazilla);
router.delete('/:id/:status?', ifAllowed, ifSystemUser, ParamValidation, deleteUpazilla);

module.exports = router;