const express = require('express');
const router = express.Router();

const { ifAllowed } = require('../oauth/Oauth');
const { ParamValidation } = require("../validations/ParamValidation");
const { ownerCreateValidation, ownerUpdateValidation, ownerLoginValidation } = require('../validations/OwnerValidation');
const { logOwner, findOwner, createOwner, updateOwner, deleteOwner } = require('../controllers/OwnerController');

router.get('/:id?/:status?/:limit?/:offset?', ifAllowed, ParamValidation, findOwner);
router.post('/', ownerCreateValidation, createOwner);
router.put('/:id', ifAllowed, ParamValidation, ownerUpdateValidation, updateOwner);
router.patch('/:id', ifAllowed, ParamValidation, ownerUpdateValidation, updateOwner);
router.delete('/:id/:status?', ifAllowed, ParamValidation, deleteOwner);
router.post('/login', ownerLoginValidation, logOwner);

module.exports = router;