const express = require('express');
const { createSubCategory, getSubCategories, getSubCategory, deleteSubCategory, updateSubCategory } = require('../services/subCategoryService');
const { createSubCategoryValidator, getSubCategoryValidator, deleteSubCategoryValidator, updateSubCategoryValidator } = require('../utils/validators/subCategoryValidator');

const router = express.Router();


router.route('/')
    .get(getSubCategories)
    .post(createSubCategoryValidator, createSubCategory)


router.route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)

module.exports = router;