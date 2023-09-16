const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

getBrandValidator = [
    check('id').isMongoId().withMessage("Invalid Brand id format"),
    validatorMiddleware,
]

createBrandValidator = [
    check('name').notEmpty().withMessage('Brand required').isLength({ min: 3 }).withMessage('Too short Brand name').isLength({ max: 32 }).withMessage('Too long Brand name'),
    validatorMiddleware,
]

updateBrandValidator = [
    check('id').isMongoId().withMessage("Invalid Brand id format"),
    validatorMiddleware
]

deleteBrandValidator = [
    check('id').isMongoId().withMessage("Invalid Brand id format"),
    validatorMiddleware
]

module.exports = {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
}
