const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

getCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware,
]

createCategoryValidator = [
    check('name').notEmpty().withMessage('Category required').isLength({ min: 3 }).withMessage('Too short category name').isLength({ max: 32 }).withMessage('Too long category name'),
    validatorMiddleware,
]

updateCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
]

deleteCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
]

module.exports = {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
}
