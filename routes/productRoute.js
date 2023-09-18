const express = require('express');
const { createProduct, getProduct, deleteProduct, updateProduct, getProducts } = require('../services/productService');
const { getProductValidator, deleteProductValidator, updateProductValidator, createProductValidator } = require('../utils/validators/productValidator');


const router = express.Router();


router.route('/').get(getProducts).post(createProductValidator, createProduct)
router.route('/:id')
    .get(getProductValidator, getProduct)
    .delete(deleteProductValidator, deleteProduct)
    .put(updateProductValidator, updateProduct)


module.exports = router;