const express = require('express');
const router = express.Router();

const { ifAllowed, ifSystemUser } = require('../oauth/Oauth');
const { ParamValidation } = require("../validations/ParamValidation");
const { unionCreateValidation, unionUpdateValidation } = require('../validations/UnionValidation');
const { findUnion, createUnion, updateUnion, deleteUnion } = require('../controllers/UnionController');

router.get('/:id?/:upazilla_id?/:limit?/:offset?/:status?', ParamValidation, findUnion);
router.post('/', ifAllowed, ifSystemUser, unionCreateValidation, createUnion);
router.put('/:id', ifAllowed, ifSystemUser, ParamValidation, unionUpdateValidation, updateUnion);
router.patch('/:id', ifAllowed, ifSystemUser, ParamValidation, unionUpdateValidation, updateUnion);
router.delete('/:id/:status?', ifAllowed, ifSystemUser, ParamValidation, deleteUnion);

module.exports = router;