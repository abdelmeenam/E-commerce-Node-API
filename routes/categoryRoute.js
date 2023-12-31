const express = require('express');
const { getCategories, createCategory, getCategory, deleteCategory, updateCategory } = require('../services/categoryService');
const { getCategoryValidator, deleteCategoryValidator, updateCategoryValidator, createCategoryValidator } = require('../utils/validators/categoryValidator');
const subCategoryRoute = require('./subCategoryRoute')




const router = express.Router();




router.use('/:categoryId/subcategories', subCategoryRoute)

router.route('/').get(getCategories).post(createCategoryValidator, createCategory)
router.route('/:id')
    .get(getCategoryValidator, getCategory)
    .delete(deleteCategoryValidator, deleteCategory)
    .put(updateCategoryValidator, updateCategory)


module.exports = router;