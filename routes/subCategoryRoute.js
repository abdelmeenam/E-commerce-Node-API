const express = require('express');
const { createSubCategory, getSubCategories, getSubCategory, deleteSubCategory, updateSubCategory, setCategoryIdToBody, cerateFilterObj } = require('../services/subCategoryService');
const { createSubCategoryValidator, getSubCategoryValidator, deleteSubCategoryValidator, updateSubCategoryValidator } = require('../utils/validators/subCategoryValidator');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(cerateFilterObj, getSubCategories)
    .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)


router
    .route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)

module.exports = router;