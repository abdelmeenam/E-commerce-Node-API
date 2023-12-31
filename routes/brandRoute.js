const express = require('express');
const { getBrands, createBrand, getBrand, deleteBrand, updateBrand } = require('../services/brandService');
const { getBrandValidator, createBrandValidator, updateBrandValidator, deleteBrandValidator } = require('../utils/validators/brandValidator');

const router = express.Router();


router.route('/')
    .get(getBrands)
    .post(createBrandValidator, createBrand)
router.route('/:id')
    .get(getBrandValidator, getBrand)
    .delete(deleteBrandValidator, deleteBrand)
    .put(updateBrandValidator, updateBrand)


module.exports = router;