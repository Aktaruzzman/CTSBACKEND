const express = require('express');
const multer = require('multer')
const upload = multer({ dest: './public/data/uploads/brand/' })
const router = express.Router();

const { ifAllowed, ifSystemUser } = require('../oauth/Oauth');
const { ParamValidation } = require("../validations/ParamValidation");
const { brandCreateValidation, brandUpdateValidation } = require('../validations/BrandValidation ');
const { findBrand, createBrand, updateBrand, deleteBrand } = require('../controllers/BrandController');

router.get('/:id?/:status?/:limit?/:offset?', ParamValidation, findBrand);
router.post('/', ifAllowed, ifSystemUser, brandCreateValidation, upload.single('logo'), createBrand);
router.put('/:id', ifAllowed, ifSystemUser, ParamValidation, brandUpdateValidation, updateBrand);
router.patch('/:id', ifAllowed, ifSystemUser, ParamValidation, brandUpdateValidation, updateBrand);
router.delete('/:id/:status?', ifAllowed, ifSystemUser, ParamValidation, deleteBrand);


module.exports = router;