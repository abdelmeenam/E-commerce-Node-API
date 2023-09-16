const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const getSubCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware,
]

const createSubCategoryValidator = [
    check('name')
        .notEmpty().withMessage('Category required')
        .isLength({ min: 3 }).withMessage('Too short category name')
        .isLength({ max: 32 }).withMessage('Too long category name'),
    check('category')
        .notEmpty().withMessage('Category required')
        .isMongoId().withMessage("Invalid category id format")
    ,
    validatorMiddleware,
]

const updateSubCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
]

const deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
]

module.exports = {
    getSubCategoryValidator,
    createSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
}
